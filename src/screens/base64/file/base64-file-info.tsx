import { Typography } from "antd";
import { createStyles } from "antd-style";

import { formatBase64Size } from "./base64-file.utils";

interface Base64FileInfoProps {
  fileName: string;
  mimeType: string;
  base64Output: string;
}

export const Base64FileInfo = ({ fileName, mimeType, base64Output }: Base64FileInfoProps) => {
  const { styles } = useStyles();

  if (!fileName && !base64Output) return null;

  return (
    <div className={styles.infoSection}>
      {fileName && (
        <Typography.Text>
          <strong>File:</strong> {fileName}
        </Typography.Text>
      )}
      {mimeType && (
        <Typography.Text>
          <strong>Type:</strong> {mimeType}
        </Typography.Text>
      )}
      {base64Output && (
        <Typography.Text>
          <strong>Size: ≈</strong> {formatBase64Size(base64Output)}
        </Typography.Text>
      )}
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 12,
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
