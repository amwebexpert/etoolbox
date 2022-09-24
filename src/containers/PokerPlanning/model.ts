export const POKER_PLANNING_RATINGS_FIBONNACI_ENHANCED: string[] = [
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

export type CardsListingCategoryName = 'fibonnacy' | 'fibonnacy-variant-1' | 't-shirt' | 't-shirt-variant-1';

export type CardsListingCategory = {
    values: string[];
    displayValue: string;
    sorter: (a: string, b: string) => number;
};

export const CARDS_LISTING_CATEGORIES: Record<CardsListingCategoryName, CardsListingCategory> = {
    fibonnacy: {
        values: POKER_PLANNING_RATINGS_FIBONNACI,
        displayValue: POKER_PLANNING_RATINGS_FIBONNACI.slice(2).join(' '),
        sorter: (a: string, b: string) =>
            POKER_PLANNING_RATINGS_FIBONNACI.indexOf(a) - POKER_PLANNING_RATINGS_FIBONNACI.indexOf(b),
    },
    'fibonnacy-variant-1': {
        values: POKER_PLANNING_RATINGS_FIBONNACI_ENHANCED,
        displayValue: POKER_PLANNING_RATINGS_FIBONNACI_ENHANCED.slice(2)
            .map(v => v.replace('0.5', '½'))
            .map(v => v.replace('.5', '½'))
            .join(' '),
        sorter: (a: string, b: string) =>
            POKER_PLANNING_RATINGS_FIBONNACI_ENHANCED.indexOf(a) - POKER_PLANNING_RATINGS_FIBONNACI_ENHANCED.indexOf(b),
    },
    't-shirt': {
        values: POKER_PLANNING_RATINGS_T_SHIRT_SIZES,
        displayValue: POKER_PLANNING_RATINGS_T_SHIRT_SIZES.slice(1).join(' '),
        sorter: (a: string, b: string) =>
            POKER_PLANNING_RATINGS_T_SHIRT_SIZES.indexOf(a) - POKER_PLANNING_RATINGS_T_SHIRT_SIZES.indexOf(b),
    },
    't-shirt-variant-1': {
        values: POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHENCED,
        displayValue: POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHENCED.slice(1).join(' '),
        sorter: (a: string, b: string) =>
            POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHENCED.indexOf(a) -
            POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHENCED.indexOf(b),
    },
};

export const DEFAULT_CARDS_LISTING_CATEGORY: CardsListingCategoryName = 'fibonnacy';
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
