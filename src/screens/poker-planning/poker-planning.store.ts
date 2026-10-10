import { isBlank } from "@lichens-innovation/ts-common";
import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import ReconnectingWebSocket from "reconnecting-websocket";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { DEFAULT_CARDS_LISTING_CATEGORY } from "./poker-planning.constants";
import type { CardsListingCategoryName, PokerPlanningSession, SocketState, UserMessage } from "./poker-planning.types";
import {
  buildRemoveUserMessage,
  buildResetMessage,
  buildVoteMessage,
  canConnect,
  createSocket,
} from "./poker-planning.utils";

interface PokerPlanningState {
  hostName: string;
  roomName: string;
  username: string;
  cardsCategory: CardsListingCategoryName;

  roomUUID: string;
  socketState: SocketState;
  myEstimate?: string;
  isEstimatesVisible: boolean;
  session?: PokerPlanningSession;

  // Socket (not persisted — excluded via partialize) habit-hooks-disable non-essential-comment
  socket: ReconnectingWebSocket | null;
  postponedMessage: UserMessage | null;

  setHostName: (hostName: string) => void;
  setRoomName: (roomName: string) => void;
  setUsername: (username: string) => void;
  setCardsCategory: (cardsCategory: CardsListingCategoryName) => void;

  setRoomUUID: (roomUUID: string) => void;
  setSocketState: (socketState: SocketState) => void;
  setMyEstimate: (estimate?: string) => void;
  setIsEstimatesVisible: (isVisible: boolean) => void;
  setSession: (session?: PokerPlanningSession) => void;

  createRoom: () => void;
  joinRoom: () => void;
  vote: (value: string) => void;
  clearVotes: () => void;
  removeUser: (userToRemove: string) => void;
  toggleEstimatesVisibility: () => void;
  disconnect: () => void;
  resetSession: () => void;

  connect: () => void;
  sendMessage: (message: UserMessage) => void;
  clearSocket: () => void;
}

type PokerPlanningSet = (
  partial: Partial<PokerPlanningState> | ((state: PokerPlanningState) => Partial<PokerPlanningState>)
) => void;
type PokerPlanningGet = () => PokerPlanningState;

interface PokerPlanningSliceArgs {
  set: PokerPlanningSet;
  get: PokerPlanningGet;
}

const INITIAL_SESSION_STATE: Pick<
  PokerPlanningState,
  "roomUUID" | "socketState" | "myEstimate" | "isEstimatesVisible" | "session"
> = {
  roomUUID: "",
  socketState: "closed",
  myEstimate: undefined,
  isEstimatesVisible: false,
  session: undefined,
};

const createPreferencesSlice = ({
  set,
  get,
}: PokerPlanningSliceArgs): Pick<
  PokerPlanningState,
  "setHostName" | "setRoomName" | "setUsername" | "setCardsCategory"
> => ({
  setHostName: (hostName) => {
    if (get().hostName !== hostName) set({ hostName });
  },
  setRoomName: (roomName) => {
    if (get().roomName !== roomName) set({ roomName });
  },
  setUsername: (username) => {
    if (get().username !== username) set({ username });
  },
  setCardsCategory: (cardsCategory) => {
    if (get().cardsCategory !== cardsCategory) set({ cardsCategory });
  },
});

const createSessionStateSlice = ({
  set,
  get,
}: PokerPlanningSliceArgs): Pick<
  PokerPlanningState,
  | "setRoomUUID"
  | "setSocketState"
  | "setMyEstimate"
  | "setIsEstimatesVisible"
  | "setSession"
  | "toggleEstimatesVisibility"
> => ({
  setRoomUUID: (roomUUID) => {
    if (get().roomUUID !== roomUUID) set({ roomUUID });
  },
  setSocketState: (socketState) => {
    if (get().socketState !== socketState) set({ socketState });
  },
  setMyEstimate: (estimate) => {
    if (get().myEstimate !== estimate) set({ myEstimate: estimate });
  },
  setIsEstimatesVisible: (isVisible) => {
    if (get().isEstimatesVisible !== isVisible) set({ isEstimatesVisible: isVisible });
  },
  setSession: (session) => set({ session }),

  toggleEstimatesVisibility: () => set({ isEstimatesVisible: !get().isEstimatesVisible }),
});

const createConnectionSlice = ({
  set,
  get,
}: PokerPlanningSliceArgs): Pick<PokerPlanningState, "connect" | "clearSocket"> => ({
  connect: () => {
    const { hostName, roomUUID, socketState } = get();
    if (!canConnect({ hostName, roomUUID, socketState })) return;

    const socket = createSocket({
      hostName,
      roomUUID,
      onSessionUpdate: (session) => set({ session }),
      onSocketStateUpdate: (newSocketState) => {
        set({ socketState: newSocketState });
        const { socket: currentSocket, postponedMessage } = get();
        if (newSocketState === "open" && postponedMessage && currentSocket) {
          currentSocket.send(JSON.stringify(postponedMessage));
          set({ postponedMessage: null });
        }
      },
    });

    set({ socket });
  },

  clearSocket: () => {
    const { socket } = get();
    socket?.close();
    set({ socket: null, postponedMessage: null });
  },
});

const createRoomLifecycleSlice = ({
  set,
  get,
}: PokerPlanningSliceArgs): Pick<PokerPlanningState, "createRoom" | "joinRoom" | "disconnect" | "resetSession"> => ({
  createRoom: () => {
    const { hostName, roomName, setRoomUUID, connect } = get();
    if (isBlank(hostName) || isBlank(roomName)) return;

    const newRoomUUID = uuidv4();
    setRoomUUID(newRoomUUID);
    // Connection will be triggered after roomUUID is set habit-hooks-disable non-essential-comment
    setTimeout(() => connect(), 0);
  },

  joinRoom: () => {
    const { username, sendMessage } = get();
    if (isBlank(username)) return;
    sendMessage(buildVoteMessage({ username }));
  },

  disconnect: () => {
    const { socket } = get();
    socket?.close();
    set({ socket: null, postponedMessage: null, ...INITIAL_SESSION_STATE });
  },

  resetSession: () => set({ ...INITIAL_SESSION_STATE }),
});

const createMessagingSlice = ({
  set,
  get,
}: PokerPlanningSliceArgs): Pick<PokerPlanningState, "sendMessage" | "vote" | "clearVotes" | "removeUser"> => ({
  sendMessage: (message: UserMessage) => {
    const { socket, socketState } = get();
    if (socket && socketState === "open") {
      socket.send(JSON.stringify(message));
    } else {
      set({ postponedMessage: message });
    }
  },

  vote: (value: string) => {
    const { myEstimate, username, sendMessage, setMyEstimate } = get();
    const nextEstimate = value === myEstimate ? undefined : value;
    setMyEstimate(nextEstimate);
    sendMessage(buildVoteMessage({ username, value: nextEstimate }));
  },

  clearVotes: () => {
    const { sendMessage } = get();
    sendMessage(buildResetMessage());
  },

  removeUser: (userToRemove: string) => {
    const { sendMessage } = get();
    sendMessage(buildRemoveUserMessage(userToRemove));
  },
});

const stateCreator = (set: PokerPlanningSet, get: PokerPlanningGet): PokerPlanningState => ({
  hostName: "",
  roomName: "",
  username: "",
  cardsCategory: DEFAULT_CARDS_LISTING_CATEGORY,

  ...INITIAL_SESSION_STATE,

  socket: null,
  postponedMessage: null,

  ...createPreferencesSlice({ set, get }),
  ...createSessionStateSlice({ set, get }),
  ...createConnectionSlice({ set, get }),
  ...createRoomLifecycleSlice({ set, get }),
  ...createMessagingSlice({ set, get }),
});

const PERSISTED_STORE_NAME = "etoolbox-poker-planning";

const persistedStateCreator = persist<PokerPlanningState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
  // Only persist user preferences, not session state or socket habit-hooks-disable non-essential-comment
  partialize: (state) =>
    ({
      hostName: state.hostName,
      roomName: state.roomName,
      username: state.username,
      cardsCategory: state.cardsCategory,
    }) as PokerPlanningState,
});

export const usePokerPlanningStore = createDevToolsStore(PERSISTED_STORE_NAME, () =>
  create<PokerPlanningState>()(persistedStateCreator)
);

export const useClearSocket = () => usePokerPlanningStore((state) => state.clearSocket);
