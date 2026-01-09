import { createStyles } from "antd-style";

import { GithubFiltersRow } from "./github-filters-row";
import { GithubSearchRow } from "./github-search-row";
import type { GithubUserProject } from "./github-user-projects.types";

interface GithubUserProjectsToolbarProps {
  projects: GithubUserProject[];
  filteredCount: number;
  isLoading: boolean;
  isFetching: boolean;
  onSearch: () => void;
  onRefresh: () => void;
}

export const GithubUserProjectsToolbar = ({
  projects,
  filteredCount,
  isLoading,
  isFetching,
  onSearch,
  onRefresh,
}: GithubUserProjectsToolbarProps) => {
  const { styles } = useStyles();

  const hasProjects = projects.length > 0;

  return (
    <div className={styles.toolbar}>
      <GithubSearchRow
        totalCount={projects.length}
        filteredCount={filteredCount}
        isLoading={isLoading}
        isFetching={isFetching}
        onSearch={onSearch}
        onRefresh={onRefresh}
      />

      {hasProjects && <GithubFiltersRow projects={projects} />}
    </div>
  );
};

const useStyles = createStyles(() => ({
  toolbar: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 16,
  },
}));
