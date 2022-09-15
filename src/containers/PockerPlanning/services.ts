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

export const SIMULATED_DATA: UserEstimate[] = [
    {
        username: 'john_doe',
        estimate: '5',
        estimatedAt: new Date('2022-09-12T11:28:35.009Z'),
    },
    {
        username: 'marry_doe',
        estimate: '4.5',
        estimatedAt: new Date('2022-09-12T11:29:00.000Z'),
    },
    {
        username: 'george_slow',
    },
    {
        username: 'amy_award',
        estimate: '4',
        estimatedAt: new Date('2022-09-12T11:30:22.000Z'),
    },
    {
        username: 'modern_grammy',
    },
    {
        username: 'not_sure',
        estimate: '?',
        estimatedAt: new Date('2022-09-12T11:27:33.000Z'),
    },
];

export function doSomething(): void {
    console.log('doSomething');
}
