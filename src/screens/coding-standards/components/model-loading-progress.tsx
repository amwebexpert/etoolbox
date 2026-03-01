import { Alert, Progress, Spin, Typography } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";

const { Text, Title } = Typography;

interface ModelLoadingProgressProps {
  isLoading: boolean;
  progress: string;
}

export const ModelLoadingProgress: FunctionComponent<ModelLoadingProgressProps> = ({ isLoading, progress }) => {
  const { styles } = useStyles();

  if (!isLoading && !progress) {
    return null;
  }

  const isError = progress.startsWith("Error:");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Spin size="large" spinning={isLoading && !isError} />

        <div className={styles.textContainer}>
          <Title level={5} className={styles.title}>
            {isError ? "Model Loading Error" : "Loading AI Model"}
          </Title>
          <Text type="secondary" className={styles.description}>
            {progress || "Initializing Transformer.js model..."}
          </Text>

          {isLoading && !isError && (
            <>
              <Progress percent={100} status="active" showInfo={false} className={styles.progress} />
              <Text type="secondary" className={styles.hint}>
                This may take 30-60 seconds on first load. The model is ~15MB and will be cached.
              </Text>
            </>
          )}
        </div>
      </div>

      {isError && (
        <Alert
          message="Failed to load model"
          description={progress.replace("Error: ", "")}
          type="error"
          showIcon
          className={styles.alert}
        />
      )}
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    width: "100%",
    padding: 24,
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    marginBottom: 16,
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    margin: "0 0 8px 0 !important",
  },
  description: {
    display: "block",
    marginBottom: 8,
  },
  progress: {
    marginTop: 8,
  },
  hint: {
    display: "block",
    marginTop: 8,
    fontSize: 12,
    fontStyle: "italic",
  },
  alert: {
    marginTop: 16,
  },
}));
