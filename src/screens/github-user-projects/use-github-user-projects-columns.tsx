import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { ColumnBranch, ColumnLanguage, ColumnRepository, ColumnStats, ColumnUpdatedAt } from "./columns";
import type { GithubUserProject } from "./github-user-projects.types";

export const useGithubUserProjectsColumns = (): ColumnsType<GithubUserProject> => {
  const { styles } = useStyles();
  const { isMobile, isTablet } = useResponsive();

  const baseColumns: ColumnsType<GithubUserProject> = [
    {
      title: "Repository",
      dataIndex: "name",
      key: "name",
      width: isMobile ? 200 : 280,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_: string, record: GithubUserProject) => (
        <div className={styles.repoCell}>
          <ColumnRepository record={record} isMobile={isMobile} />
        </div>
      ),
    },
  ];

  // Language column (hidden on mobile)
  if (!isMobile) {
    baseColumns.push({
      title: "Language",
      dataIndex: "language",
      key: "language",
      width: 120,
      sorter: (a, b) => (a.language ?? "").localeCompare(b.language ?? ""),
      render: (language: string | null) => (
        <Space size={4}>
          <ColumnLanguage language={language} />
        </Space>
      ),
    });
  }

  // Stats column (stars, forks, watchers)
  baseColumns.push({
    title: isMobile ? "Stats" : "Stars / Forks",
    key: "stats",
    width: isMobile ? 80 : 140,
    sorter: (a, b) => a.stargazers_count - b.stargazers_count,
    render: (_, record: GithubUserProject) => (
      <Space size={isTablet ? 8 : 12} wrap className={styles.stats}>
        <ColumnStats record={record} isMobile={isMobile} isTablet={isTablet} />
      </Space>
    ),
  });

  // Updated column
  baseColumns.push({
    title: "Updated",
    dataIndex: "updated_at",
    key: "updated_at",
    width: isMobile ? 90 : 130,
    sorter: (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
    defaultSortOrder: "descend",
    render: (updatedAt: string) => <ColumnUpdatedAt updatedAt={updatedAt} />,
  });

  // Branch column (hidden on mobile and tablet)
  if (!isMobile && !isTablet) {
    baseColumns.push({
      title: "Branch",
      dataIndex: "default_branch",
      key: "default_branch",
      width: 100,
      render: (branch: string) => (
        <Space size={4}>
          <ColumnBranch branch={branch} />
        </Space>
      ),
    });
  }

  return baseColumns;
};

const useStyles = createStyles(() => ({
  repoCell: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  stats: {
    display: "flex",
    alignItems: "center",
  },
}));
