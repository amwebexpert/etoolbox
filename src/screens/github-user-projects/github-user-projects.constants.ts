import type { SortField, SortOrder } from "./github-user-projects.types";

// Query keys for TanStack Query cache
export const GithubProjectsQueryKey = {
  all: ["github-projects"] as const,
  list: (username: string) => [...GithubProjectsQueryKey.all, "list", username] as const,
} as const;

// Default values
export const DEFAULT_USERNAME = "";
export const DEFAULT_FILTER = "";
export const DEFAULT_LANGUAGE = "all";
export const DEFAULT_SORT_FIELD: SortField = "updated_at";
export const DEFAULT_SORT_ORDER: SortOrder = "desc";
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_SHOW_FORKS = true;
export const DEFAULT_SHOW_ARCHIVED = true;

// Pagination options
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

// Sort options
export const SORT_FIELD_OPTIONS: Array<{ value: SortField; label: string }> = [
  { value: "updated_at", label: "Last updated" },
  { value: "name", label: "Name" },
  { value: "stargazers_count", label: "Stars" },
  { value: "watchers_count", label: "Watchers" },
  { value: "forks_count", label: "Forks" },
];

// API configuration
export const GITHUB_API_BASE_URL = "https://api.github.com";
export const GITHUB_REPOS_PER_PAGE = 100; // Max allowed by GitHub API
