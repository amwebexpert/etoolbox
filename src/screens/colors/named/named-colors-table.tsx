import { Table } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { useNamedColorsStore } from "./named-colors.store";
import type { ColorInfo } from "./named-colors.utils";
import { PAGE_SIZE_OPTIONS } from "./named-colors.utils";
import { useNamedColorsColumns } from "./use-named-colors-columns";

interface NamedColorsTableProps {
  filteredColors: ColorInfo[];
}

export const NamedColorsTable = ({ filteredColors }: NamedColorsTableProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const columns = useNamedColorsColumns();

  const { page, pageSize, handlePageChange } = useNamedColorsStore();

  return (
    <Table
      dataSource={filteredColors}
      columns={columns}
      rowKey={(record) => `${record.htmlName}-${record.hexCode}`}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: filteredColors.length,
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS.map(String),
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} colors`,
        size: isMobile ? "small" : "default",
        onChange: handlePageChange,
      }}
      size="small"
      scroll={{ x: "max-content" }}
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
      paddingBlock: 0,
      paddingInline: 8,
    },
  },
}));
