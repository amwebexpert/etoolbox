import { Typography } from "antd";

interface CsvParserCellValueProps {
  value: unknown;
}

export const CsvParserCellValue = ({ value }: CsvParserCellValueProps) => {
  if (value === null || value === undefined) {
    return <Typography.Text type="secondary">—</Typography.Text>;
  }

  if (typeof value === "boolean") {
    return <Typography.Text code>{String(value)}</Typography.Text>;
  }

  if (typeof value === "number") {
    return <Typography.Text>{value.toLocaleString()}</Typography.Text>;
  }

  return <>{String(value)}</>;
};
