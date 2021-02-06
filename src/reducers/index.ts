import { combineReducers } from 'redux';
import counterReducer, { CounterState } from './counter-reducer';
import textInputsReducer, { TextInputsState } from './text-reducer';
import mimeTypeReducer, { MimeTypesState } from './mime-type-reducer';
import htmlEntityReducer, { HtmlEntitiesState } from './html-entity-reducer';

export interface AppState {
    counter: CounterState;
    textInputs: TextInputsState;
    mimeTypes: MimeTypesState;
    htmlEntities: HtmlEntitiesState,
}

const reducers = combineReducers({
    counter: counterReducer,
    textInputs: textInputsReducer,
    mimeTypes: mimeTypeReducer,
    htmlEntities: htmlEntityReducer,
});

export default reducers;
