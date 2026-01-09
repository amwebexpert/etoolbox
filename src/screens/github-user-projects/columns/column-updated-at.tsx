import { Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { formatRelativeTime } from "../github-user-projects.utils";

const { Text } = Typography;

type ColumnUpdatedAtProps = {
  updatedAt: string;
};

export const ColumnUpdatedAt = ({ updatedAt }: ColumnUpdatedAtProps) => {
  const { styles } = useStyles();

  return (
    <>
      <Tooltip title={new Date(updatedAt).toLocaleString()}>
        <Text type="secondary" className={styles.date}>
          {formatRelativeTime(updatedAt)}
        </Text>
      </Tooltip>
    </>
  );
};

const useStyles = createStyles(() => ({
  date: {
    fontSize: 12,
    whiteSpace: "nowrap",
  },
}));
