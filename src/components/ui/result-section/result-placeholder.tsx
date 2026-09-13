import { Typography } from "antd";

import { useStyles } from "./result-section.styles";

interface ResultPlaceholderProps {
  message: string;
}

export const ResultPlaceholder = ({ message }: ResultPlaceholderProps) => {
  const { styles } = useStyles();

  return (
    <div className={styles.placeholder}>
      <Typography.Text type="secondary">{message}</Typography.Text>
    </div>
  );
};
