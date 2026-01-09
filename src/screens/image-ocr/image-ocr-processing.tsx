import { Card, Progress, Typography } from "antd";
import { createStyles } from "antd-style";

import type { WorkerStatus } from "./image-ocr.utils";
import { getProgressStatus } from "./image-ocr.utils";

const { Text } = Typography;

interface ImageOcrProcessingProps {
  workerStatus: WorkerStatus;
}

export const ImageOcrProcessing = ({ workerStatus }: ImageOcrProcessingProps) => {
  const { styles } = useStyles();

  const progressPercent = Math.round(workerStatus.progress * 100);
  const progressStatus = getProgressStatus(workerStatus.progress, workerStatus.status);

  return (
    <Card className={styles.card}>
      <div className={styles.processingContainer}>
        <Text className={styles.processingText}>{progressStatus}</Text>
        <Progress
          percent={progressPercent}
          status="active"
          strokeColor={{ from: "#108ee9", to: "#87d068" }}
          className={styles.progress}
        />
      </div>
    </Card>
  );
};

const useStyles = createStyles(() => ({
  card: {
    width: "100%",
  },
  processingContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 16,
  },
  processingText: {
    textAlign: "center",
    fontWeight: 500,
  },
  progress: {
    width: "100%",
  },
}));
