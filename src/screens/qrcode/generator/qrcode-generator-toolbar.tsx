import { ClearOutlined, CopyOutlined, DownloadOutlined, PictureOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

interface QRCodeGeneratorToolbarProps {
  hasContent: boolean;
  hasResult: boolean;
  isGenerating: boolean;
  onGenerate: () => void;
  onCopyDataUrl: () => void;
  onCopyImage: () => void;
  onDownload: () => void;
  onClear: () => void;
}

export const QRCodeGeneratorToolbar = ({
  hasContent,
  hasResult,
  isGenerating,
  onGenerate,
  onCopyDataUrl,
  onCopyImage,
  onDownload,
  onClear,
}: QRCodeGeneratorToolbarProps) => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Clear all fields">
          <Button icon={<ClearOutlined />} disabled={!hasContent && !hasResult} onClick={onClear}>
            {!isMobile && "Clear"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy QR code data URL to clipboard">
          <Button icon={<CopyOutlined />} disabled={!hasResult} onClick={onCopyDataUrl}>
            {!isMobile && "Copy URL"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy QR code image to clipboard">
          <Button icon={<PictureOutlined />} disabled={!hasResult} onClick={onCopyImage}>
            {!isMobile && "Copy Image"}
          </Button>
        </Tooltip>

        <Tooltip title="Download QR code image">
          <Button icon={<DownloadOutlined />} disabled={!hasResult} onClick={onDownload}>
            {!isMobile && "Download"}
          </Button>
        </Tooltip>

        <Tooltip title="Generate QR code from the input text">
          <Button
            type="primary"
            icon={<QrcodeOutlined />}
            disabled={!hasContent}
            loading={isGenerating}
            onClick={onGenerate}
          >
            Generate
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
