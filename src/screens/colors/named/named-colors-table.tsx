import { Table } from "antd";

import { useResponsive } from "~/hooks/use-responsive";
import { useCompactListTableStyles } from "~/styles/list-table.styles";
import { smallSizeOnMobile } from "~/utils/responsive.utils";

import { useNamedColorsStore } from "./named-colors.store";
import { type ColorInfo, PAGE_SIZE_OPTIONS } from "./named-colors.utils";
import { useNamedColorsColumns } from "./use-named-colors-columns";

interface NamedColorsTableProps {
  filteredColors: ColorInfo[];
}

export const NamedColorsTable = ({ filteredColors }: NamedColorsTableProps) => {
  const { styles } = useCompactListTableStyles();
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
        size: smallSizeOnMobile(isMobile),
        onChange: (page, pageSize) => handlePageChange({ page, pageSize }),
      }}
      size="small"
      scroll={{ x: "max-content" }}
      className={styles.table}
    />
  );
};
