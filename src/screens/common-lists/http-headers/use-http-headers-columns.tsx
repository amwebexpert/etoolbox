import { LinkOutlined } from "@ant-design/icons";
import { Tag, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { CATEGORY_LABELS, TYPE_LABELS } from "./http-headers.constants";
import type { HttpHeaderEntry } from "./http-headers.types";

const { Text } = Typography;

const CATEGORY_COLORS: Record<string, string> = {
  authentication: "purple",
  caching: "blue",
  conditionals: "cyan",
  connection: "geekblue",
  "content-negotiation": "lime",
  controls: "gold",
  cookies: "orange",
  cors: "volcano",
  downloads: "magenta",
  "message-body": "green",
  proxies: "blue",
  redirects: "orange",
  "request-context": "cyan",
  "response-context": "geekblue",
  "range-requests": "purple",
  security: "red",
  "transfer-coding": "gold",
  websockets: "lime",
  other: "default",
};

const TYPE_COLORS: Record<string, string> = {
  request: "blue",
  response: "green",
  both: "purple",
};

export const useHttpHeadersColumns = (): ColumnsType<HttpHeaderEntry> => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  return [
    {
      title: "Header",
      dataIndex: "name",
      key: "name",
      width: isMobile ? 180 : 280,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string, record: HttpHeaderEntry) => (
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
          <div className={styles.tagsRow}>
            <Tag color={TYPE_COLORS[record.type] ?? "default"} className={styles.typeTag}>
              {TYPE_LABELS[record.type] ?? record.type}
            </Tag>
            <Tag color={CATEGORY_COLORS[record.category] ?? "default"} className={styles.categoryTag}>
              {CATEGORY_LABELS[record.category] ?? record.category}
            </Tag>
          </div>
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
  tagsRow: {
    display: "flex",
    gap: 4,
    flexWrap: "wrap",
  },
  nameText: {
    fontSize: 13,
    fontFamily: "monospace",
    color: token.colorPrimary,
  },
  mdnLink: {
    color: token.colorTextSecondary,
    fontSize: 14,
    "&:hover": {
      color: token.colorPrimary,
    },
  },
  typeTag: {
    fontSize: 10,
    marginRight: 0,
    padding: "0 4px",
  },
  categoryTag: {
    fontSize: 10,
    marginRight: 0,
    padding: "0 4px",
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
