import { isNotBlank, PeriodsInMS } from "@lichens-innovation/ts-common";
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
    staleTime: 5 * PeriodsInMS.oneMinute,
    gcTime: 30 * PeriodsInMS.oneMinute,
  });

  const projects: GithubUserProject[] = data ?? [];
  const hasProjects = projects.length > 0;

  return {
    projects,
    hasProjects,
    isLoadingProjects: isLoading && shouldFetch,
    isFetchingProjects: isFetching,
    isProjectsError: isError,
    projectsError: error as Error | null,
    refetchProjects: refetch,
  };
};
