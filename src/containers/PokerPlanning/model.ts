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
    roomUUID: string;
    username: string;
    estimate?: string;
    estimatedAt?: Date;
};

export type PokerPlanningSession = {
    lastUpdate: Date;
    estimates: UserEstimate[];
};

export type MessageType = 'reset' | 'vote';

export type UserMessage = {
    type: MessageType;
    payload?: unknown;
};

export const SOCKET_STATES: Map<number, string> = new Map([
    [WebSocket.CLOSED, 'close'],
    [WebSocket.OPEN, 'open'],
    [WebSocket.CLOSING, 'closing'],
    [WebSocket.CONNECTING, 'connecting'],
]);

export type EstimatesStats = {
    values: number[];
    estimatesSum: number;
    estimatesAverage: number;
};
