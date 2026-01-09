import { Table } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { useResponsive } from "~/hooks/use-responsive";

import { useMimeTypesStore } from "./mime-types.store";
import { applyFiltering, PAGE_SIZE_OPTIONS } from "./mime-types.utils";
import { useMimeTypesColumns } from "./use-mime-types-columns";

export const MimeTypesTable = () => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const columns = useMimeTypesColumns();

  const { category, filter, page, pageSize, setPage, setPageSize } = useMimeTypesStore();

  const deferredCategory = useDeferredValue(category);
  const deferredFilter = useDeferredValue(filter);

  const filteredMimeTypes = applyFiltering({ category: deferredCategory, filter: deferredFilter });

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  };

  return (
    <Table
      dataSource={filteredMimeTypes}
      columns={columns}
      rowKey={(record) => record.mimeType}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: filteredMimeTypes.length,
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS.map(String),
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} MIME types`,
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
      paddingBlock: 4,
      paddingInline: 8,
    },
  },
}));
