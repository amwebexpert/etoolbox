import { Table } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { useHttpHeadersStore } from "./http-headers.store";
import type { HttpHeaderEntry } from "./http-headers.types";
import { PAGE_SIZE_OPTIONS } from "./http-headers.utils";
import { useHttpHeadersColumns } from "./use-http-headers-columns";

interface HttpHeadersTableProps {
  filteredHeaders: HttpHeaderEntry[];
}

export const HttpHeadersTable = ({ filteredHeaders }: HttpHeadersTableProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const columns = useHttpHeadersColumns();

  const { page, pageSize, handlePageChange } = useHttpHeadersStore();

  return (
    <Table
      dataSource={filteredHeaders}
      columns={columns}
      rowKey={(record) => record.name}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: filteredHeaders.length,
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS.map(String),
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} headers`,
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
