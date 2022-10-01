export type UserEstimate = {
    username: string;
    estimate?: string;
    estimatedAtISO8601?: string;
};

export type PokerPlanningSession = {
    lastUpdateISO8601: string;
    estimates: UserEstimate[];
};

export type MessageType = 'reset' | 'vote' | 'remove';

export type UserMessage<TPayload = unknown> = {
    type: MessageType;
    payload?: TPayload;
};
