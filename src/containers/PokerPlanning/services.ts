import { EstimatesStats, UserEstimate } from './model';

export const parseEstimates = (estimates: UserEstimate[]): EstimatesStats => {
    const values = estimates
        .map(e => e.estimate)
        .filter(e => e !== null && e !== undefined && e !== '?')
        .map(e => Number(e));
    const estimatesSum = values.reduce((acc, val) => acc + Number(val), 0);
    const estimatesAverage = values.length > 0 ? estimatesSum / values.length : 0;

    return {
        values,
        estimatesSum,
        estimatesAverage,
    };
};
