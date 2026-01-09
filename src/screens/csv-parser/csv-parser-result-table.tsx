import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import type { CsvParseResult } from "./csv-parser.types";
import { CsvParserCellValue } from "./csv-parser-cell-value";

interface CsvParserResultTableProps {
  result: CsvParseResult;
}

export const CsvParserResultTable = ({ result }: CsvParserResultTableProps) => {
  const { styles } = useStyles();
  const { isMobile, isTablet } = useResponsive();

  const maxHeight = isMobile ? 300 : isTablet ? 400 : 500;

  const tableColumns: ColumnsType<Record<string, unknown>> =
    result.meta.fields?.map((field) => ({
      title: field,
      dataIndex: field,
      key: field,
      ellipsis: true,
      width: isMobile ? 120 : 150,
      render: (value: unknown) => <CsvParserCellValue value={value} />,
    })) ?? [];

  const tableData = result.data.map((row, index) => ({
    key: index,
    ...(row as Record<string, unknown>),
  }));

  return (
    <div className={styles.resultSection}>
      <Typography.Text type="secondary" className={styles.resultLabel}>
        Parsed Data ({result.data.length} rows)
      </Typography.Text>

      <div className={styles.tableContainer}>
        <Table
          columns={tableColumns}
          dataSource={tableData}
          scroll={{ x: "max-content", y: maxHeight }}
          size="small"
          pagination={{
            pageSize: isMobile ? 10 : 25,
            showSizeChanger: !isMobile,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} rows`,
          }}
        />
      </div>
    </div>
  );
};

const useStyles = createStyles(() => ({
  resultSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  resultLabel: {
    fontWeight: 500,
  },
  tableContainer: {
    width: "100%",
    overflow: "auto",
  },
}));
