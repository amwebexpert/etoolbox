import { GithubOutlined } from "@ant-design/icons";
import { isNotBlank } from "@lichens-innovation/ts-common";
import { Flex } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useMemo } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useToastMessage } from "~/providers/toast-message-provider";

import { GithubUserProjectsEmpty } from "./github-user-projects-empty";
import { GithubUserProjectsStats } from "./github-user-projects-stats";
import { GithubUserProjectsTable } from "./github-user-projects-table";
import { GithubUserProjectsToolbar } from "./github-user-projects-toolbar";
import { DEFAULT_PAGE } from "./github-user-projects.constants";
import { useGithubUserProjectsStore } from "./github-user-projects.store";
import { applyFiltering, applySorting } from "./github-user-projects.utils";
import { useGithubUserProjects } from "./use-github-user-projects";

export const GithubUserProjects = () => {
  const { styles } = useStyles();
  const messageApi = useToastMessage();

  const {
    username,
    lastSearchedUsername,
    filter,
    language,
    showForks,
    showArchived,
    sortField,
    sortOrder,
    setLastSearchedUsername,
    setPage,
  } = useGithubUserProjectsStore();

  const { projects, hasProjects, isLoading, isFetching, isError, error, refetch } = useGithubUserProjects({
    username: lastSearchedUsername,
  });

  // Apply filtering and sorting
  const processedProjects = useMemo(() => {
    const filtered = applyFiltering({
      projects,
      filter,
      language,
      showForks,
      showArchived,
    });

    return applySorting({
      projects: filtered,
      sortField,
      sortOrder,
    });
  }, [projects, filter, language, showForks, showArchived, sortField, sortOrder]);

  // Show error toast when fetch fails
  useEffect(() => {
    if (isError && error) {
      messageApi.error(error.message);
    }
  }, [isError, error, messageApi]);

  const handleSearch = () => {
    if (isNotBlank(username)) {
      setLastSearchedUsername(username.trim());
      setPage(DEFAULT_PAGE);
    }
  };

  const handleRefresh = () => {
    refetch();
    messageApi.info("Refreshing repositories...");
  };

  const hasSearched = isNotBlank(lastSearchedUsername);
  const showTable = hasProjects && processedProjects.length > 0;
  const showEmpty = !isLoading && (!hasProjects || processedProjects.length === 0);

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.container}>
        <ScreenHeader
          icon={<GithubOutlined />}
          title="GitHub User Projects"
          description="Search and explore public repositories of any GitHub user"
        />

        <GithubUserProjectsToolbar
          projects={projects}
          filteredCount={processedProjects.length}
          isLoading={isLoading}
          isFetching={isFetching}
          onSearch={handleSearch}
          onRefresh={handleRefresh}
        />

        {hasProjects && <GithubUserProjectsStats projects={projects} />}

        {showEmpty && (
          <GithubUserProjectsEmpty
            hasSearched={hasSearched}
            username={lastSearchedUsername}
            isError={isError}
            errorMessage={error?.message}
          />
        )}

        {showTable && <GithubUserProjectsTable projects={processedProjects} isLoading={isFetching} />}
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
}));
