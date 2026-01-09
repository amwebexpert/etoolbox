import { LoadingOutlined } from "@ant-design/icons";
import { Progress, Typography } from "antd";
import { createStyles } from "antd-style";

interface Vr3dViewerLoadingProps {
  progress: number;
  fileName?: string;
}

export const Vr3dViewerLoading = ({ progress, fileName }: Vr3dViewerLoadingProps) => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <LoadingOutlined className={styles.icon} />
      <Typography.Text className={styles.text}>Loading model{fileName ? `: ${fileName}` : "..."}</Typography.Text>
      <Progress percent={Math.round(progress)} size="small" className={styles.progress} status="active" />
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: token.paddingLG,
    gap: 12,
  },
  icon: {
    fontSize: 32,
    color: token.colorPrimary,
  },
  text: {
    fontSize: 14,
  },
  progress: {
    width: "100%",
    maxWidth: 300,
  },
}));
