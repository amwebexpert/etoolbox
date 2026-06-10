import { Card, Descriptions, Skeleton } from "antd";
import { createStyles } from "antd-style";

import { buildPanelStats } from "./compressor-image-panel.utils";

export interface CompressorImagePanelProps {
  title: string;
  src: string | null;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  mimeType: string;
  compressionRatio?: string;
  isLoading?: boolean;
}

export const CompressorImagePanel = ({
  title,
  src,
  sizeBytes,
  width,
  height,
  mimeType,
  compressionRatio,
  isLoading = false,
}: CompressorImagePanelProps) => {
  const { styles } = useStyles();
  const stats = buildPanelStats({ sizeBytes, width, height, mimeType, compressionRatio });

  return (
    <Card title={title} className={styles.card} styles={{ body: { padding: 16 } }}>
      <div className={styles.imageContainer}>
        {isLoading || !src ? (
          <Skeleton.Image active={isLoading} className={styles.skeleton} />
        ) : (
          <img src={src} alt={title} className={styles.image} />
        )}
      </div>
      <Descriptions size="small" column={1} className={styles.stats}>
        {stats.map((stat) => (
          <Descriptions.Item key={stat.label} label={stat.label}>
            {stat.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  card: {
    width: "100%",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    backgroundColor: token.colorFillTertiary,
    borderRadius: token.borderRadius,
    overflow: "hidden",
  },
  image: {
    maxWidth: "100%",
    maxHeight: 320,
    objectFit: "contain",
  },
  skeleton: {
    width: "100%",
    height: "100%",
    minHeight: 200,
  },
  stats: {
    marginTop: token.marginSM,
    ".ant-descriptions-item-label": {
      width: 120,
      fontWeight: 500,
    },
  },
}));
