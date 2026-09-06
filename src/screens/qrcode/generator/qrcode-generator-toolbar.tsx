import { ClearOutlined, CopyOutlined, DownloadOutlined, PictureOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
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

  return (
    <ScreenToolbar
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear all fields">
            <Button aria-label="Clear" icon={<ClearOutlined />} disabled={!hasContent && !hasResult} onClick={onClear}>
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>

          <Tooltip title="Copy QR code data URL to clipboard">
            <Button aria-label="Copy URL" icon={<CopyOutlined />} disabled={!hasResult} onClick={onCopyDataUrl}>
              {!isMobile && "Copy URL"}
            </Button>
          </Tooltip>

          <Tooltip title="Copy QR code image to clipboard">
            <Button aria-label="Copy Image" icon={<PictureOutlined />} disabled={!hasResult} onClick={onCopyImage}>
              {!isMobile && "Copy Image"}
            </Button>
          </Tooltip>

          <Tooltip title="Download QR code image">
            <Button aria-label="Download" icon={<DownloadOutlined />} disabled={!hasResult} onClick={onDownload}>
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
      }
    />
  );
};
