import { Spin, Typography } from "antd";
import { createStyles } from "antd-style";

interface QrCodeContentProps {
  isLoadingQRCode: boolean;
  qrCodeDataUrl: string | null;
}

export const QrCodeContent = ({ isLoadingQRCode, qrCodeDataUrl }: QrCodeContentProps) => {
  const { styles } = useStyles();

  if (isLoadingQRCode) {
    return <Spin size="large" />;
  }

  if (!qrCodeDataUrl) {
    return <Typography.Text type="secondary">Failed to generate QR code</Typography.Text>;
  }

  return (
    <>
      <img src={qrCodeDataUrl} alt="Room QR Code" className={styles.qrImage} />
      <Typography.Text type="secondary" className={styles.hint}>
        Scan to join the room
      </Typography.Text>
    </>
  );
};

const useStyles = createStyles(({ token }) => ({
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
