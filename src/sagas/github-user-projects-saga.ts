import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  GithubUserProjectsActionTypes,
  listGithubUserProjectsFailed,
  ListGithubUserProjectsRequestedAction,
  listGithubUserProjectsSucceeded,
} from '../actions/github-userprojects-actions';
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
  } catch (e: unknown) {
    yield put(listGithubUserProjectsFailed(e));
  }
}

export function* githubUserProjectsSaga() {
  yield takeLatest(GithubUserProjectsActionTypes.LIST_PROJECTS_REQUESTED, listGithubUserProjects);
}
