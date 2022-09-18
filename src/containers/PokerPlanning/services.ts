import { EstimatesStats, SocketState, SOCKET_STATES, UserEstimate } from './model';

export const parseEstimates = (estimates: UserEstimate[], username?: string): EstimatesStats => {
    const values = estimates
        .map(e => e.estimate)
        .filter(e => e !== null && e !== undefined && e !== '?')
        .map(e => Number(e));
    const estimatesSum = values.reduce((acc, val) => acc + Number(val), 0);
    const average = values.length > 0 ? estimatesSum / values.length : 0;
    const estimatesAverage = Math.round(average * 10 + Number.EPSILON) / 10;
    const isEstimatesCleared = estimates.length > 0 && estimates.every(e => e.estimate === undefined);
    const isUsernameProvided = !!username?.trim();
    const isUserMemberOfRoom = isUsernameProvided && estimates.some(e => e.username === username);

    return {
        values,
        estimatesSum,
        estimatesAverage,
        isEstimatesCleared,
        isUserMemberOfRoom,
    };
};

export const getSocketState = (state: number): SocketState => SOCKET_STATES.get(state) ?? 'closed';
