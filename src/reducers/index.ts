import { combineReducers } from 'redux';
import textInputsReducer, { TextInputsState } from './text-reducer';
import mimeTypesReducer, { MimeTypesState } from './mime-type-reducer';
import htmlEntitiesReducer, { HtmlEntitiesState } from './html-entity-reducer';
import gitHubUserProjectsReducer, { GithubUserProjectsState } from './github-user-projects-reducer';

export interface AppState {
    textInputs: TextInputsState;
    mimeTypes: MimeTypesState;
    htmlEntities: HtmlEntitiesState,
    githubUserProjects: GithubUserProjectsState,
}

const reducers = combineReducers({
    textInputs: textInputsReducer,
    mimeTypes: mimeTypesReducer,
    htmlEntities: htmlEntitiesReducer,
    githubUserProjects: gitHubUserProjectsReducer,
});

export default reducers;
