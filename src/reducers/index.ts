import { combineReducers } from 'redux';
import counterReducer, { CounterState } from './counter-reducer';
import textInputsReducer, { TextInputsState } from './text-reducer';
import mimeTypeReducer, { MimeTypesState } from './mime-type-reducer';

export interface AppState {
    counter: CounterState;
    textInputs: TextInputsState;
    mimeTypes: MimeTypesState;
}

const reducers = combineReducers({
    counter: counterReducer,
    textInputs: textInputsReducer,
    mimeTypes: mimeTypeReducer,
});

export default reducers;
