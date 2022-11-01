import { combineReducers } from 'redux';

import gitHubUserProjectsReducer, { GithubUserProjectsState } from './github-user-projects-reducer';
import htmlEntitiesReducer, { HtmlEntitiesState } from './html-entity-reducer';
import mimeTypesReducer, { MimeTypesState } from './mime-type-reducer';
import textInputsReducer, { TextInputsState } from './text-reducer';

export interface AppState {
  textInputs: TextInputsState;
  mimeTypes: MimeTypesState;
  htmlEntities: HtmlEntitiesState;
  githubUserProjects: GithubUserProjectsState;
}

const reducers = combineReducers({
  textInputs: textInputsReducer,
  mimeTypes: mimeTypesReducer,
  htmlEntities: htmlEntitiesReducer,
  githubUserProjects: gitHubUserProjectsReducer,
});

export default reducers;
