export interface UserEstimate {
  username: string;
  estimate?: string;
  estimatedAtISO8601?: string;
}

export interface PokerPlanningSession {
  lastUpdateISO8601: string;
  estimates: UserEstimate[];
}

export type MessageType = "reset" | "vote" | "remove";

export interface UserMessage<TPayload = unknown> {
  type: MessageType;
  payload?: TPayload;
}

export type SocketState = "open" | "closed" | "closing" | "connecting";

export type CardsListingCategoryName = "fibonacci" | "fibonacci-enhanced" | "t-shirt" | "t-shirt-enhanced";

export interface CardsListingCategory {
  values: string[];
  displayValue: string;
  sorter: (a: UserEstimate, b: UserEstimate) => number;
}

export interface EstimatesStats {
  values: number[];
  estimatesSum: number;
  estimatesAverage: number;
  isEstimatesCleared: boolean;
  isUserMemberOfRoom: boolean;
}

export interface CreateSocketParams {
  hostName?: string;
  roomUUID?: string;
  onSocketStateUpdate: (socketState: SocketState) => void;
  onSessionUpdate: (session: PokerPlanningSession) => void;
}

export interface BuildRouteURLParams {
  hostName?: string;
  roomUUID?: string;
  roomName?: string;
}
