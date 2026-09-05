import ReconnectingWebSocket from "reconnecting-websocket";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { DEFAULT_CARDS_LISTING_CATEGORY } from "./poker-planning.constants";
import type { CardsListingCategoryName, PokerPlanningSession, SocketState, UserMessage } from "./poker-planning.types";
import { buildRemoveUserMessage, buildResetMessage, buildVoteMessage, createSocket } from "./poker-planning.utils";

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

const createSettersSlice = ({
  set,
  get,
}: PokerPlanningSliceArgs): Pick<
  PokerPlanningState,
  | "setHostName"
  | "setRoomName"
  | "setUsername"
  | "setCardsCategory"
  | "setRoomUUID"
  | "setSocketState"
  | "setMyEstimate"
  | "setIsEstimatesVisible"
  | "setSession"
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
});

const createSocketSlice = ({
  set,
  get,
}: PokerPlanningSliceArgs): Pick<PokerPlanningState, "connect" | "sendMessage" | "clearSocket"> => ({
  connect: () => {
    const { hostName, roomUUID, socketState } = get();
    if (!hostName || !roomUUID || socketState === "open" || socketState === "connecting") {
      return;
    }

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

  sendMessage: (message: UserMessage) => {
    const { socket, socketState } = get();
    if (socket && socketState === "open") {
      socket.send(JSON.stringify(message));
    } else {
      set({ postponedMessage: message });
    }
  },

  clearSocket: () => {
    const { socket } = get();
    socket?.close();
    set({ socket: null, postponedMessage: null });
  },
});

const createActionsSlice = ({
  set,
  get,
}: PokerPlanningSliceArgs): Pick<
  PokerPlanningState,
  | "createRoom"
  | "joinRoom"
  | "vote"
  | "clearVotes"
  | "removeUser"
  | "toggleEstimatesVisibility"
  | "disconnect"
  | "resetSession"
> => ({
  createRoom: () => {
    const { hostName, roomName, setRoomUUID, connect } = get();
    if (!hostName || !roomName) return;

    const newRoomUUID = uuidv4();
    setRoomUUID(newRoomUUID);
    // Connection will be triggered after roomUUID is set habit-hooks-disable non-essential-comment
    setTimeout(() => connect(), 0);
  },

  joinRoom: () => {
    const { username, sendMessage } = get();
    if (!username) return;
    sendMessage(buildVoteMessage({ username }));
  },

  vote: (value: string) => {
    const { myEstimate, username, sendMessage, setMyEstimate } = get();
    if (value !== myEstimate) {
      setMyEstimate(value);
      sendMessage(buildVoteMessage({ username, value }));
    } else {
      setMyEstimate(undefined);
      sendMessage(buildVoteMessage({ username }));
    }
  },

  clearVotes: () => {
    const { sendMessage } = get();
    sendMessage(buildResetMessage());
  },

  removeUser: (userToRemove: string) => {
    const { sendMessage } = get();
    sendMessage(buildRemoveUserMessage(userToRemove));
  },

  toggleEstimatesVisibility: () => {
    const { isEstimatesVisible } = get();
    set({ isEstimatesVisible: !isEstimatesVisible });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
    }
    set({
      socket: null,
      postponedMessage: null,
      roomUUID: "",
      socketState: "closed",
      myEstimate: undefined,
      isEstimatesVisible: false,
      session: undefined,
    });
  },

  resetSession: () =>
    set({
      roomUUID: "",
      socketState: "closed",
      myEstimate: undefined,
      isEstimatesVisible: false,
      session: undefined,
    }),
});

const stateCreator = (set: PokerPlanningSet, get: PokerPlanningGet): PokerPlanningState => ({
  hostName: "",
  roomName: "",
  username: "",
  cardsCategory: DEFAULT_CARDS_LISTING_CATEGORY,

  roomUUID: "",
  socketState: "closed",
  myEstimate: undefined,
  isEstimatesVisible: false,
  session: undefined,

  socket: null,
  postponedMessage: null,

  ...createSettersSlice({ set, get }),
  ...createSocketSlice({ set, get }),
  ...createActionsSlice({ set, get }),
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

export const usePokerPlanningStore = create<PokerPlanningState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);

export const useClearSocket = () => usePokerPlanningStore((state) => state.clearSocket);
