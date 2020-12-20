import { combineReducers } from 'redux';
import counterReducer, { CounterState } from './counter-reducer';
import textInputsReducer, { TextInputsState } from './text-reducer';

export interface AppState {
    counter: CounterState;
    textInputs: TextInputsState;
}

const reducers = combineReducers({
    counter: counterReducer,
    textInputs: textInputsReducer,
});

export default reducers;
