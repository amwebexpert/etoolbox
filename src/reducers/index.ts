import { combineReducers } from 'redux';
import counterReducer, { CounterState } from './counter-reducer';

export interface AppState {
    counter: CounterState;
}

const reducers = combineReducers({
    counter: counterReducer,
});

export default reducers;
