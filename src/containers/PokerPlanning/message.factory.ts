import { UserEstimate, UserMessage } from './model';

export const buildVoteMessage = (username = '', value?: string): UserMessage<UserEstimate> => ({
    type: 'vote',
    payload: {
        username,
        estimate: value,
        estimatedAt: value ? new Date() : undefined,
    },
});

export const buildResetMessage = (): UserMessage => ({ type: 'reset' });

export const buildRemoveUserMessage = (username = ''): UserMessage<string> => ({ type: 'remove', payload: username });
