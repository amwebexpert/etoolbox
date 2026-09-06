import { Table } from "antd";

import { useResponsive } from "~/hooks/use-responsive";
import { useListTableStyles } from "~/styles/list-table.styles";
import { smallSizeOnMobile } from "~/utils/responsive.utils";

import { useMimeTypesStore } from "./mime-types.store";
import type { MimeTypeEntry } from "./mime-types.types";
import { PAGE_SIZE_OPTIONS } from "./mime-types.utils";
import { useMimeTypesColumns } from "./use-mime-types-columns";

interface MimeTypesTableProps {
  filteredMimeTypes: MimeTypeEntry[];
}

export const MimeTypesTable = ({ filteredMimeTypes }: MimeTypesTableProps) => {
  const { styles } = useListTableStyles();
  const { isMobile } = useResponsive();
  const columns = useMimeTypesColumns();

  const { page, pageSize, handlePageChange } = useMimeTypesStore();

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
        size: smallSizeOnMobile(isMobile),
        onChange: (page, pageSize) => handlePageChange({ page, pageSize }),
      }}
      size="small"
      scroll={{ x: "max-content" }}
      className={styles.table}
    />
  );
};
