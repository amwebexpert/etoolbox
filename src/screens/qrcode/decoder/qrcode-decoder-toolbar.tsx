import { ClearOutlined, CopyOutlined, ScanOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

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
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Clear image and result">
          <Button icon={<ClearOutlined />} disabled={!hasImage && !hasResult} onClick={onClear}>
            {!isMobile && "Clear"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy decoded text to clipboard">
          <Button icon={<CopyOutlined />} disabled={!hasResult} onClick={onCopyResult}>
            {!isMobile && "Copy Result"}
          </Button>
        </Tooltip>

        <Tooltip title="Decode QR code from the image">
          <Button type="primary" icon={<ScanOutlined />} disabled={!hasImage} loading={isDecoding} onClick={onDecode}>
            Decode
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
