import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";

import { useRoomQRCode } from "../hooks/use-room-qrcode";
import { QrCodeContent } from "./qr-code-content";

export const PokerPlanningQRCode = () => {
  const { styles } = useStyles();
  const { copyImageToClipboard } = useClipboardCopy();
  const { qrCodeDataUrl, isLoadingQRCode, isSessionActive } = useRoomQRCode();

  const handleCopyQRCode = () => {
    if (qrCodeDataUrl) {
      void copyImageToClipboard({
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
            disabled={!qrCodeDataUrl || isLoadingQRCode}
            onClick={handleCopyQRCode}
          />
        </Tooltip>
      }
    >
      <div className={styles.container}>
        <QrCodeContent isLoadingQRCode={isLoadingQRCode} qrCodeDataUrl={qrCodeDataUrl} />
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
}));
