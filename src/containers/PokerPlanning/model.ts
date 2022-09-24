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

export const POKER_PLANNING_RATINGS_FIBONNACI: string[] = ['?', '0', '1', '2', '3', '5', '8', '13', '20', '40', '100'];

export const POKER_PLANNING_RATINGS_T_SHIRT_SIZES: string[] = ['?', 'S', 'M', 'L', 'XL'];

export const POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHENCED: string[] = ['?', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const CARD_VALUES_CHOICES = [
    POKER_PLANNING_RATINGS_FIBONNACI.slice(2).join(' '),
    POKER_PLANNING_RATINGS_ENHANCED.slice(2)
        .map(v => v.replace('0.5', '½'))
        .map(v => v.replace('.5', '½'))
        .join(' '),
    POKER_PLANNING_RATINGS_T_SHIRT_SIZES.slice(1).join(' '),
    POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHENCED.slice(1).join(' '),
];

export const DEFAULT_ROOM_UUID = 'default';
export const DEFAULT_ROOM_NAME = 'default';
export const DEFAULT_HOSTNAME = 'localhost';

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

export type UserMessage<TPayload = unknown> = {
    type: MessageType;
    payload?: TPayload;
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
    isUserMemberOfRoom: boolean;
};
