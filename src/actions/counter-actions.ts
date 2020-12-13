export enum CounterActionTypes {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT',
    INCREMENT_ASYNC = 'INCREMENT_ASYNC'
}

export interface IncrementAction {
    type: CounterActionTypes.INCREMENT;
    value: number;
}

export function incrementAction(value: number): IncrementAction {
    return {
        type: CounterActionTypes.INCREMENT,
        value
    }
}

export interface DecrementAction {
    type: CounterActionTypes.DECREMENT;
    value: number;
}

export function decrementAction(value: number): DecrementAction {
    return {
        type: CounterActionTypes.DECREMENT,
        value
    }
}

export interface IncrementAsyncAction {
    type: CounterActionTypes.INCREMENT_ASYNC;
    value: number;
}

export function incrementAsyncAction(value: number): IncrementAsyncAction {
    return {
        type: CounterActionTypes.INCREMENT_ASYNC,
        value
    }
}

export type CounterAction = IncrementAction | DecrementAction | IncrementAsyncAction;
