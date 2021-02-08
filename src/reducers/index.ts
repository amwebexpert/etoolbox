import { combineReducers } from 'redux';
import textInputsReducer, { TextInputsState } from './text-reducer';
import mimeTypeReducer, { MimeTypesState } from './mime-type-reducer';
import htmlEntityReducer, { HtmlEntitiesState } from './html-entity-reducer';

export interface AppState {
    textInputs: TextInputsState;
    mimeTypes: MimeTypesState;
    htmlEntities: HtmlEntitiesState,
}

const reducers = combineReducers({
    textInputs: textInputsReducer,
    mimeTypes: mimeTypeReducer,
    htmlEntities: htmlEntityReducer,
});

export default reducers;
