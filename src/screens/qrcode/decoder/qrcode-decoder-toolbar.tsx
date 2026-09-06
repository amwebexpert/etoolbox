import { ClearOutlined, CopyOutlined, ScanOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useResponsive } from "~/hooks/use-responsive";

interface QRCodeDecoderToolbarProps {
  hasImage: boolean;
  hasResult: boolean;
  isDecoding: boolean;
  onDecode: () => void;
  onCopyResult: () => void;
  onClear: () => void;
}

export const QRCodeDecoderToolbar = ({
  hasImage,
  hasResult,
  isDecoding,
  onDecode,
  onCopyResult,
  onClear,
}: QRCodeDecoderToolbarProps) => {
  const { isMobile } = useResponsive();

  return (
    <ScreenToolbar
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear image and result">
            <Button aria-label="Clear" icon={<ClearOutlined />} disabled={!hasImage && !hasResult} onClick={onClear}>
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>

          <Tooltip title="Copy decoded text to clipboard">
            <Button aria-label="Copy Result" icon={<CopyOutlined />} disabled={!hasResult} onClick={onCopyResult}>
              {!isMobile && "Copy Result"}
            </Button>
          </Tooltip>

          <Tooltip title="Decode QR code from the image">
            <Button type="primary" icon={<ScanOutlined />} disabled={!hasImage} loading={isDecoding} onClick={onDecode}>
              Decode
            </Button>
          </Tooltip>
        </Space>
      }
    />
  );
};
