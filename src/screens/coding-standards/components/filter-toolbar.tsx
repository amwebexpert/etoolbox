import { Flex, Slider, Typography } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";

const { Text } = Typography;

interface FilterToolbarProps {
  minSimilarity: number;
  onSimilarityChange: (similarity: number) => void;
}

export const FilterToolbar: FunctionComponent<FilterToolbarProps> = ({ minSimilarity, onSimilarityChange }) => {
  const { styles } = useStyles();

  return (
    <Flex vertical gap="small" className={styles.container}>
      <div>
        <Text strong className={styles.label}>
          Minimum Similarity: {minSimilarity.toFixed(1)}
        </Text>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={minSimilarity}
          onChange={onSimilarityChange}
          tooltip={{ formatter: (v) => `${Number(v).toFixed(1)}` }}
        />
      </div>
    </Flex>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
  label: {
    display: "block",
    marginBottom: 8,
  },
}));
