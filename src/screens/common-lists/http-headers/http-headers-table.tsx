import { Table } from "antd";

import { useResponsive } from "~/hooks/use-responsive";
import { useTopAlignedListTableStyles } from "~/styles/list-table.styles";
import { smallSizeOnMobile } from "~/utils/responsive.utils";

import { useHttpHeadersStore } from "./http-headers.store";
import type { HttpHeaderEntry } from "./http-headers.types";
import { PAGE_SIZE_OPTIONS } from "./http-headers.utils";
import { useHttpHeadersColumns } from "./use-http-headers-columns";

interface HttpHeadersTableProps {
  filteredHeaders: HttpHeaderEntry[];
}

export const HttpHeadersTable = ({ filteredHeaders }: HttpHeadersTableProps) => {
  const { styles } = useTopAlignedListTableStyles();
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
        size: smallSizeOnMobile(isMobile),
        onChange: (page, pageSize) => handlePageChange({ page, pageSize }),
      }}
      size="small"
      className={styles.table}
    />
  );
};
