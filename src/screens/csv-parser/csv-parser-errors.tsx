import { WarningOutlined } from "@ant-design/icons";
import { Alert, Collapse, Typography } from "antd";
import { createStyles } from "antd-style";

import type { CsvParseError } from "./csv-parser.types";

interface CsvParserErrorsProps {
  errors: CsvParseError[];
}

export const CsvParserErrors = ({ errors }: CsvParserErrorsProps) => {
  const { styles } = useStyles();

  if (!errors.length) {
    return null;
  }

  const items = [
    {
      key: "1",
      label: (
        <span className={styles.collapseLabel}>
          <WarningOutlined className={styles.warningIcon} />
          {errors.length} parsing warning{errors.length > 1 ? "s" : ""} detected
        </span>
      ),
      children: (
        <div className={styles.errorList}>
          {errors.map((error, index) => (
            <div key={index} className={styles.errorItem}>
              <Typography.Text strong>Row {error.row !== undefined ? error.row + 1 : "Unknown"}:</Typography.Text>{" "}
              <Typography.Text>{error.message}</Typography.Text>
              <Typography.Text type="secondary" className={styles.errorCode}>
                ({error.type} - {error.code})
              </Typography.Text>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Alert
      title={<Collapse ghost items={items} className={styles.collapse} />}
      type="warning"
      className={styles.alert}
    />
  );
};

const useStyles = createStyles(({ token }) => ({
  alert: {
    padding: "0 !important",
    ".ant-alert-message": {
      width: "100%",
    },
  },
  collapse: {
    ".ant-collapse-header": {
      padding: "12px 16px !important",
    },
    ".ant-collapse-content-box": {
      padding: "0 16px 12px !important",
    },
  },
  collapseLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 500,
  },
  warningIcon: {
    color: token.colorWarning,
  },
  errorList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  errorItem: {
    padding: "8px 12px",
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    border: `1px solid ${token.colorBorder}`,
  },
  errorCode: {
    marginLeft: 8,
    fontSize: 12,
  },
}));
