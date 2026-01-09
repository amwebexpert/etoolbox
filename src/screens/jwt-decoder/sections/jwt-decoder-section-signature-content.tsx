import { InfoCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { createStyles } from "antd-style";

interface JwtDecoderSectionSignatureContentProps {
  signature: string;
}

export const JwtDecoderSectionSignatureContent = ({ signature }: JwtDecoderSectionSignatureContentProps) => {
  const { styles } = useStyles();

  return (
    <div className={styles.signatureBlock}>
      <Typography.Paragraph type="secondary" className={styles.signatureInfo}>
        <InfoCircleOutlined /> The signature is used to verify that the message hasn&apos;t been tampered with. To
        verify the signature, you need the secret key (for HMAC) or public key (for RSA/ECDSA).
      </Typography.Paragraph>

      <Typography.Text code className={styles.signature}>
        {signature || "No signature"}
      </Typography.Text>
    </div>
  );
};

const useStyles = createStyles(() => ({
  signatureBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  signatureInfo: {
    marginBottom: 0,
  },
  signature: {
    wordBreak: "break-all",
    display: "block",
    padding: 8,
  },
}));
