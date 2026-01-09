import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

interface Base64FileToolbarProps {
  hasContent: boolean;
  onClear: () => void;
  onCopy: () => void;
  onCopyDataUri: () => void;
  onDownload: () => void;
}

export const Base64FileToolbar = ({
  hasContent,
  onClear,
  onCopy,
  onCopyDataUri,
  onDownload,
}: Base64FileToolbarProps) => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      <Button onClick={onClear} disabled={!hasContent}>
        Clear
      </Button>

      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Copy raw Base64 to clipboard">
          <Button icon={<CopyOutlined />} disabled={!hasContent} onClick={onCopy}>
            {!isMobile && "Copy Base64"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy as Data URI (data:mime;base64,...)">
          <Button icon={<CopyOutlined />} disabled={!hasContent} onClick={onCopyDataUri}>
            {!isMobile && "Copy Data URI"}
          </Button>
        </Tooltip>

        <Tooltip title="Decode Base64 and download as file">
          <Button type="primary" icon={<DownloadOutlined />} disabled={!hasContent} onClick={onDownload}>
            {isMobile ? "DL" : "Download"}
          </Button>
        </Tooltip>
      </Space>
    </div>
  );
};

const useStyles = createStyles(() => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  spacer: {
    flex: 1,
  },
}));
