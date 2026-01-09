export interface GithubProjectOwner {
  avatar_url: string;
  html_url: string;
  id: number;
  login: string;
  type: string;
}

export interface GithubUserProject {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  homepage: string | null;
  language: string | null;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  archived: boolean;
  disabled: boolean;
  fork: boolean;
  private: boolean;
  owner: GithubProjectOwner;
  topics: string[];
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string | null;
  } | null;
}

export type SortField = "name" | "updated_at" | "stargazers_count" | "watchers_count" | "forks_count";
export type SortOrder = "asc" | "desc";

export interface ProjectStats {
  totalProjects: number;
  totalStars: number;
  totalForks: number;
  languages: string[];
}
