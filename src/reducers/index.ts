import { combineReducers } from 'redux';
import textInputsReducer, { TextInputsState } from './text-reducer';
import mimeTypesReducer, { MimeTypesState } from './mime-type-reducer';
import htmlEntitiesReducer, { HtmlEntitiesState } from './html-entity-reducer';

export interface AppState {
    textInputs: TextInputsState;
    mimeTypes: MimeTypesState;
    htmlEntities: HtmlEntitiesState,
}

const reducers = combineReducers({
    textInputs: textInputsReducer,
    mimeTypes: mimeTypesReducer,
    htmlEntities: htmlEntitiesReducer,
});

export default reducers;
