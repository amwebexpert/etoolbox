import { Table } from "antd";

import { useResponsive } from "~/hooks/use-responsive";
import { useTopAlignedListTableStyles } from "~/styles/list-table.styles";
import { smallSizeOnMobile } from "~/utils/responsive.utils";

import { useHttpStatusCodesStore } from "./http-status-codes.store";
import type { HttpStatusCodeEntry } from "./http-status-codes.types";
import { PAGE_SIZE_OPTIONS } from "./http-status-codes.utils";
import { useHttpStatusCodesColumns } from "./use-http-status-codes-columns";

interface HttpStatusCodesTableProps {
  filteredStatusCodes: HttpStatusCodeEntry[];
}

export const HttpStatusCodesTable = ({ filteredStatusCodes }: HttpStatusCodesTableProps) => {
  const { styles } = useTopAlignedListTableStyles();
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
        size: smallSizeOnMobile(isMobile),
        onChange: (page, pageSize) => handlePageChange({ page, pageSize }),
      }}
      size="small"
      className={styles.table}
    />
  );
};
