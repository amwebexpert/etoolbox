import { Table } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { useHttpStatusCodesStore } from "./http-status-codes.store";
import type { HttpStatusCodeEntry } from "./http-status-codes.types";
import { PAGE_SIZE_OPTIONS } from "./http-status-codes.utils";
import { useHttpStatusCodesColumns } from "./use-http-status-codes-columns";

interface HttpStatusCodesTableProps {
  filteredStatusCodes: HttpStatusCodeEntry[];
}

export const HttpStatusCodesTable = ({ filteredStatusCodes }: HttpStatusCodesTableProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const columns = useHttpStatusCodesColumns();

  const { page, pageSize, handlePageChange } = useHttpStatusCodesStore();

  return (
    <Table
      dataSource={filteredStatusCodes}
      columns={columns}
      rowKey={(record) => record.code}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: filteredStatusCodes.length,
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS.map(String),
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} status codes`,
        size: isMobile ? "small" : "default",
        onChange: handlePageChange,
      }}
      size="small"
      className={styles.table}
    />
  );
};

const useStyles = createStyles(({ token }) => ({
  table: {
    ".ant-table-thead > tr > th": {
      backgroundColor: token.colorPrimaryBg,
    },
    ".ant-table-tbody > tr > td": {
      borderBottom: "none",
      paddingBlock: 8,
      paddingInline: 8,
      verticalAlign: "top",
    },
  },
}));
