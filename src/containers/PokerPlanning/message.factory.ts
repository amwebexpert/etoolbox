import { UserEstimate, UserMessage } from './common.model';

export const buildVoteMessage = (username = '', value?: string): UserMessage<UserEstimate> => ({
  type: 'vote',
  payload: {
    username,
    estimate: value,
    estimatedAtISO8601: value ? new Date().toISOString() : undefined,
  },
});

export const buildResetMessage = (): UserMessage => ({ type: 'reset' });

export const buildRemoveUserMessage = (username = ''): UserMessage<string> => ({ type: 'remove', payload: username });
