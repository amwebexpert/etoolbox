import { DownloadOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

interface Base64ImageToolbarProps {
  hasContent: boolean;
  canDownload: boolean;
  onClear: () => void;
  onDownload: () => void;
}

export const Base64ImageToolbar = ({ hasContent, canDownload, onClear, onDownload }: Base64ImageToolbarProps) => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      <Button onClick={onClear} disabled={!hasContent}>
        Clear
      </Button>

      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Download the decoded image">
          <Button type="primary" icon={<DownloadOutlined />} disabled={!canDownload} onClick={onDownload}>
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
