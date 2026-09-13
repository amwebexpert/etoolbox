import { Typography } from "antd";

import { useStyles } from "./result-section.styles";

interface CopyableResultTextProps {
  text: string;
}

export const CopyableResultText = ({ text }: CopyableResultTextProps) => {
  const { styles } = useStyles();

  return (
    <Typography.Text copyable={{ text }} className={styles.resultText}>
      {text}
    </Typography.Text>
  );
};
