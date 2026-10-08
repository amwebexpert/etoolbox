import { isBlank, isNotBlank } from "@lichens-innovation/ts-common";
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

  if (isBlank(fileName) && isBlank(base64Output)) return null;

  return (
    <div className={styles.infoSection}>
      {isNotBlank(fileName) && (
        <Typography.Text>
          <strong>File:</strong> {fileName}
        </Typography.Text>
      )}
      {isNotBlank(mimeType) && (
        <Typography.Text>
          <strong>Type:</strong> {mimeType}
        </Typography.Text>
      )}
      {isNotBlank(base64Output) && (
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
