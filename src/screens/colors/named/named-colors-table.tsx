import { Table } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { useResponsive } from "~/hooks/use-responsive";

import { useNamedColorsStore } from "./named-colors.store";
import { applyFiltering, PAGE_SIZE_OPTIONS } from "./named-colors.utils";
import { useNamedColorsColumns } from "./use-named-colors-columns";

export const NamedColorsTable = () => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const columns = useNamedColorsColumns();

  const { family, filter, page, pageSize, setPage, setPageSize } = useNamedColorsStore();

  const deferredFamily = useDeferredValue(family);
  const deferredFilter = useDeferredValue(filter);

  const filteredColors = applyFiltering({ family: deferredFamily, filter: deferredFilter });

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  };

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
