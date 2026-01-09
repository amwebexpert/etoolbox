import { CopyOutlined } from "@ant-design/icons";
import { Tag, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import type { MimeTypeEntry } from "./mime-types.types";
import { formatExtensions } from "./mime-types.utils";

const { Text } = Typography;

const CATEGORY_COLORS: Record<string, string> = {
  application: "blue",
  audio: "purple",
  font: "cyan",
  image: "green",
  message: "orange",
  model: "magenta",
  multipart: "geekblue",
  text: "gold",
  video: "red",
};

export const useMimeTypesColumns = (): ColumnsType<MimeTypeEntry> => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  const handleCopy = (text: string) => {
    copyTextToClipboard({ text, successMessage: `Copied: ${text}` });
  };

  return [
    {
      title: "MIME Type",
      dataIndex: "mimeType",
      key: "mimeType",
      width: isMobile ? 180 : 300,
      sorter: (a, b) => a.mimeType.localeCompare(b.mimeType),
      render: (mimeType: string, record: MimeTypeEntry) => (
        <Tooltip title="Click to copy MIME type">
          <div className={styles.mimeTypeCell} onClick={() => handleCopy(mimeType)}>
            <Text strong className={styles.mimeTypeText}>
              {mimeType}
            </Text>
            <Tag color={CATEGORY_COLORS[record.category] ?? "default"} className={styles.categoryTag}>
              {record.category}
            </Tag>
            <CopyOutlined className={styles.copyIcon} />
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Extensions",
      dataIndex: "extensions",
      key: "extensions",
      width: isMobile ? 120 : 250,
      render: (extensions: readonly string[]) => {
        const formatted = formatExtensions(extensions);
        const hasExtensions = extensions.length > 0;

        return hasExtensions ? (
          <Tooltip title="Click to copy extensions">
            <div className={styles.extensionCell} onClick={() => handleCopy(formatted)}>
              <Text code className={styles.extensionText}>
                {formatted}
              </Text>
              <CopyOutlined className={styles.copyIcon} />
            </div>
          </Tooltip>
        ) : (
          <Text type="secondary">{formatted}</Text>
        );
      },
    },
  ];
};

const useStyles = createStyles(({ token }) => ({
  mimeTypeCell: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
    flexWrap: "wrap",
  },
  mimeTypeText: {
    fontSize: 13,
    fontFamily: "monospace",
  },
  categoryTag: {
    fontSize: 11,
    marginRight: 0,
  },
  extensionCell: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
  extensionText: {
    fontSize: 12,
  },
  copyIcon: {
    opacity: 0.5,
    fontSize: 12,
    color: token.colorTextSecondary,
  },
}));
