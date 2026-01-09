import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, Spin, Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";

import { useRoomQRCode } from "../hooks/use-room-qrcode";

export const PokerPlanningQRCode = () => {
  const { styles } = useStyles();
  const { copyImageToClipboard } = useClipboardCopy();
  const { qrCodeDataUrl, isLoading, isSessionActive } = useRoomQRCode();

  const handleCopyQRCode = () => {
    if (qrCodeDataUrl) {
      copyImageToClipboard({
        dataUrl: qrCodeDataUrl,
        successMessage: "QR Code copied to clipboard!",
      });
    }
  };

  if (!isSessionActive) {
    return null;
  }

  return (
    <Card
      className={styles.card}
      size="small"
      title={<span className={styles.title}>Room QR Code</span>}
      extra={
        <Tooltip title="Copy QR Code to clipboard">
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            disabled={!qrCodeDataUrl || isLoading}
            onClick={handleCopyQRCode}
          />
        </Tooltip>
      }
    >
      <div className={styles.container}>
        {isLoading ? (
          <Spin size="large" />
        ) : qrCodeDataUrl ? (
          <>
            <img src={qrCodeDataUrl} alt="Room QR Code" className={styles.qrImage} />
            <Typography.Text type="secondary" className={styles.hint}>
              Scan to join the room
            </Typography.Text>
          </>
        ) : (
          <Typography.Text type="secondary">Failed to generate QR code</Typography.Text>
        )}
      </div>
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  card: {
    width: "fit-content",
    minWidth: 240,
    alignSelf: "center",
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 8,
    backgroundColor: token.colorBgLayout,
    borderRadius: token.borderRadius,
  },
  qrImage: {
    maxWidth: "100%",
    height: "auto",
    imageRendering: "pixelated",
    borderRadius: token.borderRadius,
  },
  hint: {
    fontSize: 12,
    textAlign: "center",
  },
}));
