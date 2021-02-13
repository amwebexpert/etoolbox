import { takeLatest, put, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { listGithubUserProjectsSucceeded, GithubUserProjectsActionTypes, 
  ListGithubUserProjectsRequestedAction, listGithubUserProjectsFailed } from '../actions/github-userprojects-actions';
import { GithubUserProject } from '../types/github-types';

function* listGithubUserProjects(action: ListGithubUserProjectsRequestedAction) {
  const url = `https://api.github.com/users/${action.username}/repos?type=all&sort=updated`;

  try {
    const response: AxiosResponse<GithubUserProject[]> = yield call(axios.get, url);
    yield put(listGithubUserProjectsSucceeded(response.data));

  } catch (e: any) {
    yield put(listGithubUserProjectsFailed(e));
  }
}

export function* githubUserProjectsSaga() {
  yield takeLatest(GithubUserProjectsActionTypes.LIST_PROJECTS_REQUESTED, listGithubUserProjects);
}
