import { takeLatest, put, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { listGithubUserProjectsSucceeded, GithubUserProjectsActionTypes, 
  ListGithubUserProjectsRequestedAction, listGithubUserProjectsFailed } from '../actions/github-userprojects-actions';
import { GithubUserProject } from '../types/github-types';

function* listGithubUserProjects(action: ListGithubUserProjectsRequestedAction) {
  const username = action.username;
  if (!username || username.trim().length === 0) {
    yield put(listGithubUserProjectsSucceeded([]));
    return;
  }

  try {
    const url = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
    const response: AxiosResponse<GithubUserProject[]> = yield call(axios.get, url);
    yield put(listGithubUserProjectsSucceeded(response.data));

  } catch (e: any) {
    yield put(listGithubUserProjectsFailed(e));
  }
}

export function* githubUserProjectsSaga() {
  yield takeLatest(GithubUserProjectsActionTypes.LIST_PROJECTS_REQUESTED, listGithubUserProjects);
}
