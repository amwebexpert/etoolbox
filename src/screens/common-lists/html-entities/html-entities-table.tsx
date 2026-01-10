import { Table } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { PAGE_SIZE_OPTIONS } from "./html-entities.constants";
import { useHtmlEntitiesStore } from "./html-entities.store";
import type { HtmlEntity } from "./html-entities.types";
import { getEntityUniqueKey } from "./html-entities.utils";
import { useHtmlEntitiesColumns } from "./use-html-entities-columns";

interface HtmlEntitiesTableProps {
  filteredEntities: HtmlEntity[];
}

export const HtmlEntitiesTable = ({ filteredEntities }: HtmlEntitiesTableProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const columns = useHtmlEntitiesColumns();

  const { page, pageSize, handlePageChange } = useHtmlEntitiesStore();

  return (
    <Table
      dataSource={filteredEntities}
      columns={columns}
      rowKey={getEntityUniqueKey}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: filteredEntities.length,
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS.map(String),
        showTotal: (total, range) =>
          isMobile ? `${range[0]}-${range[1]} / ${total}` : `${range[0]}-${range[1]} of ${total} entities`,
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
      fontWeight: 600,
    },
    ".ant-table-tbody > tr > td": {
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
      paddingBlock: 6,
      paddingInline: 8,
    },
    ".ant-table-tbody > tr:hover > td": {
      backgroundColor: token.colorPrimaryBgHover,
    },
  },
}));
