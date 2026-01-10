import { LinkOutlined } from "@ant-design/icons";
import { Tag, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { CATEGORY_LABELS } from "./http-status-codes.constants";
import type { HttpStatusCodeEntry } from "./http-status-codes.types";

const { Text } = Typography;

const CATEGORY_COLORS: Record<string, string> = {
  "1xx": "blue",
  "2xx": "green",
  "3xx": "orange",
  "4xx": "red",
  "5xx": "purple",
};

export const useHttpStatusCodesColumns = (): ColumnsType<HttpStatusCodeEntry> => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  return [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: isMobile ? 60 : 80,
      sorter: (a, b) => a.code - b.code,
      render: (code: number) => (
        <Text strong className={styles.codeText}>
          {code}
        </Text>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: isMobile ? 180 : 280,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string, record: HttpStatusCodeEntry) => (
        <div className={styles.nameCell}>
          <div className={styles.nameRow}>
            <Text strong className={styles.nameText}>
              {name}
            </Text>
            <Tooltip title="View on MDN">
              <a href={record.mdnUrl} target="_blank" rel="noopener noreferrer" className={styles.mdnLink}>
                <LinkOutlined />
              </a>
            </Tooltip>
          </div>
          <Tag color={CATEGORY_COLORS[record.category] ?? "default"} className={styles.categoryTag}>
            {CATEGORY_LABELS[record.category]?.split(" ")[1] ?? record.category}
          </Tag>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => <Text className={styles.description}>{description}</Text>,
    },
  ];
};

const useStyles = createStyles(({ token }) => ({
  codeText: {
    fontSize: 16,
    fontFamily: "monospace",
    color: token.colorPrimary,
  },
  categoryTag: {
    fontSize: 10,
    marginRight: 0,
    padding: "0 4px",
  },
  nameCell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },
  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  nameText: {
    fontSize: 13,
  },
  mdnLink: {
    color: token.colorTextSecondary,
    fontSize: 14,
    "&:hover": {
      color: token.colorPrimary,
    },
  },
  description: {
    margin: "0 !important",
    fontSize: 12,
    color: token.colorTextSecondary,
    lineHeight: 1.6,
    whiteSpace: "normal",
    wordBreak: "break-word",
  },
}));
