import { CounterActionTypes, CounterAction } from './../actions/counter-actions';

export interface CounterState {
    count: number;
}

const initalState: CounterState = {
    count: 0
}

function reducer(state: CounterState = initalState, action: CounterAction) {
    switch (action.type) {
        case CounterActionTypes.INCREMENT: {
            const newCount = state.count + action.value;
            return { ...state, count: newCount };
        }

        case CounterActionTypes.DECREMENT: {
            const newCount = state.count - action.value;
            return { ...state, count: newCount };
        }

        default:
            return state;
    }
}

export default reducer;
