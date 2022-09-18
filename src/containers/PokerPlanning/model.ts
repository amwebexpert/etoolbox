export const POKER_PLANNING_RATINGS_ENHANCED: string[] = [
    '?',
    '0',
    '0.5',
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
    '4.5',
    '5',
    '8',
    '13',
    '20',
    '40',
    '100',
];

export type UserEstimate = {
    username: string;
    estimate?: string;
    estimatedAt?: Date;
};

export type PokerPlanningSession = {
    lastUpdate: Date;
    estimates: UserEstimate[];
};

export type MessageType = 'reset' | 'vote' | 'remove';

export type UserMessage = {
    type: MessageType;
    payload?: unknown;
};

export type SocketState = 'open' | 'closed' | 'closing' | 'connecting';

export const SOCKET_STATES: Map<number, SocketState> = new Map([
    [WebSocket.CLOSED, 'closed'],
    [WebSocket.OPEN, 'open'],
    [WebSocket.CLOSING, 'closing'],
    [WebSocket.CONNECTING, 'connecting'],
]);

export type EstimatesStats = {
    values: number[];
    estimatesSum: number;
    estimatesAverage: number;
    isEstimatesCleared: boolean;
};
