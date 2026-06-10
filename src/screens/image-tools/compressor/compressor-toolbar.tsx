import { ClearOutlined, CompressOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

interface CompressorToolbarProps {
  hasFile: boolean;
  hasResult: boolean;
  isCompressing: boolean;
  onCompress: () => void;
  onDownload: () => void;
  onClear: () => void;
}

export const CompressorToolbar = ({
  hasFile,
  hasResult,
  isCompressing,
  onCompress,
  onDownload,
  onClear,
}: CompressorToolbarProps) => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Clear selected image and compression result">
          <Button icon={<ClearOutlined />} disabled={!hasFile && !hasResult} onClick={onClear}>
            {!isMobile && "Clear"}
          </Button>
        </Tooltip>

        <Tooltip title="Download the compressed image">
          <Button icon={<DownloadOutlined />} disabled={!hasResult} onClick={onDownload}>
            {!isMobile && "Download"}
          </Button>
        </Tooltip>

        <Tooltip title="Compress the selected image with the current settings">
          <Button
            type="primary"
            icon={<CompressOutlined />}
            disabled={!hasFile}
            loading={isCompressing}
            onClick={onCompress}
          >
            Compress
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
