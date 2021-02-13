import { GithubUserProject } from "../types/github-types";

export enum GithubUserProjectsActionTypes {
    LIST_PROJECTS_REQUESTED = 'GithubUserProjectsActionTypes.LIST_PROJECTS_REQUESTED',
    LIST_PROJECTS_SUCCEEDED = 'GithubUserProjectsActionTypes.LIST_PROJECTS_SUCCEEDED',
    LIST_PROJECTS_FAILED = 'GithubUserProjectsActionTypes.LIST_PROJECTS_FAILED',
}

export interface ListGithubUserProjectsRequestedAction {
    type: GithubUserProjectsActionTypes.LIST_PROJECTS_REQUESTED;
    username: string;
}

export interface ListGithubUserProjectsSucceededAction {
    type: GithubUserProjectsActionTypes.LIST_PROJECTS_SUCCEEDED;
    projects: GithubUserProject[];
}

export interface ListGithubUserProjectsFailedAction {
    type: GithubUserProjectsActionTypes.LIST_PROJECTS_FAILED;
    error: any;
}

export function listGithubUserProjectsRequested(username: string): ListGithubUserProjectsRequestedAction {
    return {
        type: GithubUserProjectsActionTypes.LIST_PROJECTS_REQUESTED,
        username
    }
}

export function listGithubUserProjectsSucceeded(elements: GithubUserProject[]): ListGithubUserProjectsSucceededAction {
    return {
        type: GithubUserProjectsActionTypes.LIST_PROJECTS_SUCCEEDED,
        projects: elements
    }
}

export function listGithubUserProjectsFailed(error: any): ListGithubUserProjectsFailedAction {
    return {
        type: GithubUserProjectsActionTypes.LIST_PROJECTS_FAILED,
        error
    }
}

export type ListGithubUserProjectsAction = ListGithubUserProjectsRequestedAction | ListGithubUserProjectsSucceededAction | ListGithubUserProjectsFailedAction;
