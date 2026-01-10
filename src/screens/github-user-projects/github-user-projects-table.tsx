import { Table } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { PAGE_SIZE_OPTIONS } from "./github-user-projects.constants";
import { useGithubUserProjectsStore } from "./github-user-projects.store";
import type { GithubUserProject } from "./github-user-projects.types";
import { useGithubUserProjectsColumns } from "./use-github-user-projects-columns";

interface GithubUserProjectsTableProps {
  projects: GithubUserProject[];
  isLoading: boolean;
}

export const GithubUserProjectsTable = ({ projects, isLoading }: GithubUserProjectsTableProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const columns = useGithubUserProjectsColumns();

  const { page, pageSize, handlePageChange } = useGithubUserProjectsStore();

  return (
    <Table
      dataSource={projects}
      columns={columns}
      rowKey={(record) => record.id}
      loading={isLoading}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: projects.length,
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS.map(String),
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} repositories`,
        size: isMobile ? "small" : "default",
        onChange: handlePageChange,
        responsive: true,
      }}
      size={isMobile ? "small" : "middle"}
      scroll={{ x: "max-content" }}
      className={styles.table}
    />
  );
};

const useStyles = createStyles(({ token }) => ({
  table: {
    ".ant-table-thead > tr > th": {
      backgroundColor: token.colorPrimaryBg,
      fontWeight: 600,
    },
    ".ant-table-tbody > tr": {
      "&:hover > td": {
        backgroundColor: token.colorPrimaryBgHover,
      },
    },
    ".ant-table-tbody > tr > td": {
      paddingBlock: 12,
      paddingInline: 12,
      verticalAlign: "top",
    },
  },
}));
