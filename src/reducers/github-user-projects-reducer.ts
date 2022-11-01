import { GithubUserProjectsActionTypes, ListGithubUserProjectsAction } from '../actions/github-userprojects-actions';
import { GithubUserProject } from '../types/github-types';

export interface GithubUserProjectsState {
  searching: boolean;
  projects: GithubUserProject[];
  error?: unknown;
}

const initalState: GithubUserProjectsState = {
  searching: false,
  projects: [],
};

function reducer(
  state: GithubUserProjectsState = initalState,
  action: ListGithubUserProjectsAction,
): GithubUserProjectsState {
  switch (action.type) {
    case GithubUserProjectsActionTypes.LIST_PROJECTS_REQUESTED: {
      return {
        ...state,
        searching: true,
      };
    }

    case GithubUserProjectsActionTypes.LIST_PROJECTS_SUCCEEDED: {
      return {
        searching: false,
        projects: action.projects,
      };
    }

    case GithubUserProjectsActionTypes.LIST_PROJECTS_FAILED: {
      return {
        searching: false,
        error: action.error,
        projects: [],
      };
    }

    default:
      return state;
  }
}

export default reducer;
