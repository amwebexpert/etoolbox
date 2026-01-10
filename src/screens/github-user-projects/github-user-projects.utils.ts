import { isBlank, isNotBlank } from "@lichens-innovation/ts-common";
import { format, formatDistanceToNow } from "date-fns";

import {
  GITHUB_API_BASE_URL,
  GITHUB_REPOS_PER_PAGE,
} from "./github-user-projects.constants";
import type {
  GithubUserProject,
  ProjectStats,
  SortField,
  SortOrder,
} from "./github-user-projects.types";

// API fetch function
export const fetchGithubUserProjects = async (
  username: string,
): Promise<GithubUserProject[]> => {
  if (isBlank(username)) {
    return [];
  }

  const trimmedUsername = username.trim();
  const url = `${GITHUB_API_BASE_URL}/users/${encodeURIComponent(trimmedUsername)}/repos?type=all&sort=updated&per_page=${GITHUB_REPOS_PER_PAGE}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`User "${trimmedUsername}" not found`);
    }
    if (response.status === 403) {
      throw new Error(
        "GitHub API rate limit exceeded. Please try again later.",
      );
    }
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }

  const data: GithubUserProject[] = await response.json();
  return data;
};

// Filtering utilities
interface ApplyFilteringArgs {
  projects: GithubUserProject[];
  filter: string;
  language: string;
  showForks: boolean;
  showArchived: boolean;
}

export const applyFiltering = ({
  projects,
  filter,
  language,
  showForks,
  showArchived,
}: ApplyFilteringArgs): GithubUserProject[] => {
  let results = projects.slice();

  // Filter by fork status
  if (!showForks) {
    results = results.filter((project) => !project.fork);
  }

  // Filter by archived status
  if (!showArchived) {
    results = results.filter((project) => !project.archived);
  }

  // Filter by language
  if (language !== "all") {
    results = results.filter(
      (project) => project.language?.toLowerCase() === language.toLowerCase(),
    );
  }

  // Filter by search term
  if (isNotBlank(filter)) {
    const filterLowercase = filter.toLowerCase().trim();
    results = results.filter((project) => {
      const nameMatch = project.name.toLowerCase().includes(filterLowercase);
      const descriptionMatch =
        project.description?.toLowerCase().includes(filterLowercase) ?? false;
      const topicsMatch =
        project.topics?.some((topic) =>
          topic.toLowerCase().includes(filterLowercase),
        ) ?? false;
      return nameMatch || descriptionMatch || topicsMatch;
    });
  }

  return results;
};

// Sorting utilities
type Comparator = (a: GithubUserProject, b: GithubUserProject) => number;

const getComparator = (sortField: SortField): Comparator => {
  if (sortField === "name") {
    return (a, b) => a.name.localeCompare(b.name);
  }
  if (sortField === "updated_at") {
    return (a, b) =>
      new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
  }
  if (sortField === "stargazers_count") {
    return (a, b) => a.stargazers_count - b.stargazers_count;
  }
  if (sortField === "watchers_count") {
    return (a, b) => a.watchers_count - b.watchers_count;
  }
  if (sortField === "forks_count") {
    return (a, b) => a.forks_count - b.forks_count;
  }
  return () => 0;
};

interface ApplySortingArgs {
  projects: GithubUserProject[];
  sortField: SortField;
  sortOrder: SortOrder;
}

export const applySorting = ({
  projects,
  sortField,
  sortOrder,
}: ApplySortingArgs): GithubUserProject[] => {
  const comparator = getComparator(sortField);
  const directionMultiplier = sortOrder === "desc" ? -1 : 1;

  return [...projects].sort((a, b) => comparator(a, b) * directionMultiplier);
};

// Extract unique languages from projects
export const extractLanguages = (projects: GithubUserProject[]): string[] => {
  const languages = new Set<string>();

  for (const project of projects) {
    if (isNotBlank(project.language)) {
      languages.add(project.language);
    }
  }

  return Array.from(languages).sort();
};

// Build language filter options
export const buildLanguageOptions = (projects: GithubUserProject[]) => {
  const languages = extractLanguages(projects);
  return [
    { value: "all", label: "All languages" },
    ...languages.map((lang) => ({ value: lang.toLowerCase(), label: lang })),
  ];
};

// Calculate project statistics
export const calculateProjectStats = (
  projects: GithubUserProject[],
): ProjectStats => {
  const totalProjects = projects.length;
  const totalStars = projects.reduce(
    (sum, project) => sum + project.stargazers_count,
    0,
  );
  const totalForks = projects.reduce(
    (sum, project) => sum + project.forks_count,
    0,
  );
  const languages = extractLanguages(projects);

  return {
    totalProjects,
    totalStars,
    totalForks,
    languages,
  };
};

// Format date for display (e.g., "Jan 5, 2026")
export const formatDate = (dateString: string): string =>
  format(new Date(dateString), "PP");

// Format relative time (e.g., "2 days ago")
export const formatRelativeTime = (dateString: string): string =>
  formatDistanceToNow(new Date(dateString), { addSuffix: true });
