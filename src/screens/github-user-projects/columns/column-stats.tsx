import { EyeOutlined, ForkOutlined, StarOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { formatCount } from "~/utils/number.utils";

import type { GithubUserProject } from "../github-user-projects.types";

const { Text } = Typography;

type ColumnStatsProps = {
  record: GithubUserProject;
  isMobile: boolean;
  isTablet: boolean;
};

export const ColumnStats = ({ record, isMobile, isTablet }: ColumnStatsProps) => {
  const { styles } = useStyles();

  return (
    <>
      <Tooltip title="Stars">
        <span className={styles.statItem}>
          <StarOutlined className={styles.statIcon} />
          <Text>{formatCount(record.stargazers_count)}</Text>
        </span>
      </Tooltip>
      {!isMobile && (
        <Tooltip title="Forks">
          <span className={styles.statItem}>
            <ForkOutlined className={styles.statIcon} />
            <Text>{formatCount(record.forks_count)}</Text>
          </span>
        </Tooltip>
      )}
      {!isMobile && !isTablet && (
        <Tooltip title="Watchers">
          <span className={styles.statItem}>
            <EyeOutlined className={styles.statIcon} />
            <Text>{formatCount(record.watchers_count)}</Text>
          </span>
        </Tooltip>
      )}
    </>
  );
};

const useStyles = createStyles(({ token }) => ({
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
  },
  statIcon: {
    color: token.colorTextSecondary,
    fontSize: 12,
  },
}));
