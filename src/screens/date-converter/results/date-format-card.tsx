import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import { createStyles } from "antd-style";

import type { DateFormat } from "../date-converter.constants";

interface DateFormatCardProps {
  format: DateFormat;
  date: Date;
  epochValue: number;
  onCopy: (value: string, label: string) => void;
}

export const DateFormatCard = ({ format, date, epochValue, onCopy }: DateFormatCardProps) => {
  const { styles } = useStyles();

  const displayValue =
    format.showCode && format.getCode ? format.getCode(date, epochValue) : format.getValue(date, epochValue);

  return (
    <Card size="small" className={styles.formatCard}>
      <div className={styles.cardHeader}>
        <Typography.Text strong>{format.label}</Typography.Text>
        <Button type="text" size="small" icon={<CopyOutlined />} onClick={() => onCopy(displayValue, format.label)} />
      </div>
      <Typography.Text type="secondary" className={styles.cardDescription}>
        {format.description}
      </Typography.Text>
      <div className={styles.cardValue}>
        {format.showCode ? (
          <Typography.Text code className={styles.codeValue}>
            {displayValue}
          </Typography.Text>
        ) : (
          <Typography.Text className={styles.valueText}>{displayValue}</Typography.Text>
        )}
      </div>
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  formatCard: {
    "& .ant-card-body": {
      padding: 12,
    },
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardDescription: {
    display: "block",
    fontSize: token.fontSizeSM,
    marginBottom: 8,
  },
  cardValue: {
    paddingTop: 4,
    borderTop: `1px solid ${token.colorBorderSecondary}`,
  },
  valueText: {
    fontFamily: "monospace",
    wordBreak: "break-all",
  },
  codeValue: {
    fontFamily: "monospace",
    fontSize: token.fontSizeSM + 1,
    backgroundColor: token.colorBgTextHover,
    padding: "2px 6px",
    borderRadius: 4,
    wordBreak: "break-all",
  },
}));
