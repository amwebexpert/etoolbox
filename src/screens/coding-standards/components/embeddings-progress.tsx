import { Progress, Typography } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";
import type { EmbeddingsProgress as EmbeddingsProgressType } from "../coding-standards.types";

const { Text } = Typography;

interface EmbeddingsProgressProps {
  progress: EmbeddingsProgressType;
}

export const EmbeddingsProgress: FunctionComponent<EmbeddingsProgressProps> = ({ progress }) => {
  const { styles } = useStyles();

  if (progress.isCompleted || progress.total === 0) {
    return null;
  }

  const percent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

  return (
    <div className={styles.container}>
      <Progress percent={percent} status="active" format={() => `${progress.completed}/${progress.total} rules`} />
      {progress.currentRule && (
        <Text type="secondary" className={styles.currentRule}>
          Computing: {progress.currentRule}
        </Text>
      )}
    </div>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
  currentRule: {
    display: "block",
    marginTop: 8,
    fontSize: 12,
  },
}));
