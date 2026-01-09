import ReconnectingWebSocket from "reconnecting-websocket";
import { v4 as uuidv4 } from "uuid";

import { DEFAULT_HOSTNAME, DEFAULT_ROOM_NAME, SOCKET_STATES } from "./poker-planning.constants";
import type {
  BuildRouteURLParams,
  CreateSocketParams,
  EstimatesStats,
  PokerPlanningSession,
  SocketState,
  UserEstimate,
  UserMessage,
} from "./poker-planning.types";

const isNumeric = (value?: string): boolean => {
  if (!value) return false;
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
};

const isDevMode = (): boolean =>
  document.location.hostname === "localhost" || document.location.hostname === "127.0.0.1";

const buildWebSocketUrl = (hostName: string, roomUUID: string): string => {
  // In development mode, use the Vite proxy to avoid CORS issues
  if (isDevMode()) {
    const protocol = document.location.protocol === "https:" ? "wss" : "ws";
    return `${protocol}://${document.location.host}/ws?roomUUID=${roomUUID}`;
  }

  // In production, connect directly to the specified host
  const protocol = document.location.protocol === "https:" ? "wss" : "ws";
  return `${protocol}://${hostName}/ws?roomUUID=${roomUUID}`;
};

// WebSocket reconnection configuration - less aggressive than defaults
const RECONNECT_OPTIONS = {
  connectionTimeout: 5000, // Time to wait before considering a connection failed (ms)
  maxRetries: 10, // Maximum number of reconnection attempts (Infinity by default)
  maxReconnectionDelay: 30000, // Maximum delay between reconnection attempts (ms)
  minReconnectionDelay: 2000, // Minimum delay before first reconnection attempt (ms)
  reconnectionDelayGrowFactor: 1.5, // Exponential backoff factor
};

export const createSocket = ({
  hostName = DEFAULT_HOSTNAME,
  roomUUID = uuidv4(),
  onSocketStateUpdate,
  onSessionUpdate,
}: CreateSocketParams): ReconnectingWebSocket => {
  const url = buildWebSocketUrl(hostName, roomUUID);

  const socket = new ReconnectingWebSocket(url, [], RECONNECT_OPTIONS);
  socket.onopen = () => onSocketStateUpdate(getSocketState(socket.readyState));
  socket.onerror = () => onSocketStateUpdate(getSocketState(socket.readyState));
  socket.onclose = () => onSocketStateUpdate(getSocketState(socket.readyState));
  socket.onmessage = (ev: MessageEvent<string>) => {
    const session = JSON.parse(ev.data) as PokerPlanningSession;
    onSessionUpdate(session);
  };

  return socket;
};

export const getSocketState = (state: number): SocketState => (SOCKET_STATES.get(state) as SocketState) ?? "closed";

interface ParseEstimatesParams {
  estimates: UserEstimate[];
  username?: string;
}

export const parseEstimates = ({ estimates, username }: ParseEstimatesParams): EstimatesStats => {
  const values = estimates
    .map((e) => e.estimate)
    .filter((e): e is string => !!e)
    .filter(isNumeric)
    .map((e) => Number(e));

  const estimatesSum = values.reduce((acc, val) => acc + val, 0);
  const average = values.length > 0 ? estimatesSum / values.length : 0;
  const estimatesAverage = Math.round(average * 10 + Number.EPSILON) / 10;
  const isEstimatesCleared = estimates.length > 0 && estimates.every((e) => e.estimate === undefined);
  const isUsernameProvided = !!username?.trim();
  const isUserMemberOfRoom = isUsernameProvided && estimates.some((e) => e.username === username);

  return {
    values,
    estimatesSum,
    estimatesAverage,
    isEstimatesCleared,
    isUserMemberOfRoom,
  };
};

export const buildRouteURL = ({
  hostName = DEFAULT_HOSTNAME,
  roomName = DEFAULT_ROOM_NAME,
  roomUUID = uuidv4(),
}: BuildRouteURLParams): string => `/poker-planning/${hostName}/${roomUUID}/${encodeURIComponent(roomName)}`;

export const extractSinglePageAppBasePath = (): string => {
  const origin = document.location.origin;
  const basePath = import.meta.env.BASE_URL ?? "/";
  // Remove trailing slash from basePath to avoid double slashes before #
  const normalizedBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  return origin + normalizedBase;
};

export const buildFullRouteURL = (params: BuildRouteURLParams): string =>
  extractSinglePageAppBasePath() + "/#" + buildRouteURL(params);

export const buildVoteMessage = (username = "", value?: string): UserMessage<UserEstimate> => ({
  type: "vote",
  payload: {
    username,
    estimate: value,
    estimatedAtISO8601: value ? new Date().toISOString() : undefined,
  },
});

export const buildResetMessage = (): UserMessage => ({ type: "reset" });

export const buildRemoveUserMessage = (username = ""): UserMessage<string> => ({
  type: "remove",
  payload: username,
});

interface GenerateQRCodeDataUrlParams {
  data: string;
  width?: number;
}

export const generateQRCodeDataUrl = async ({ data, width = 200 }: GenerateQRCodeDataUrlParams): Promise<string> => {
  const QRCode = await import("qrcode");
  return QRCode.toDataURL(data, { type: "image/png", width });
};

export const getSocketStateColor = (state: SocketState): string => {
  switch (state) {
    case "open":
      return "success";
    case "connecting":
      return "processing";
    case "closing":
      return "warning";
    case "closed":
    default:
      return "error";
  }
};
