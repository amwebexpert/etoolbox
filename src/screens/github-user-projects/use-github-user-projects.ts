import { isNotBlank } from "@lichens-innovation/ts-common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { GithubProjectsQueryKey } from "./github-user-projects.constants";
import type { GithubUserProject } from "./github-user-projects.types";
import { fetchGithubUserProjects } from "./github-user-projects.utils";

interface UseGithubUserProjectsArgs {
  username: string;
}

export const useGithubUserProjects = ({ username }: UseGithubUserProjectsArgs) => {
  const trimmedUsername = username.trim();
  const shouldFetch = isNotBlank(trimmedUsername);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: GithubProjectsQueryKey.list(trimmedUsername),
    queryFn: () => fetchGithubUserProjects(trimmedUsername),
    enabled: shouldFetch,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
  });

  const projects: GithubUserProject[] = data ?? [];
  const hasProjects = projects.length > 0;

  return {
    projects,
    hasProjects,
    isLoading: isLoading && shouldFetch,
    isFetching,
    isError,
    error: error as Error | null,
    refetch,
  };
};
