import { BranchesOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { createStyles } from "antd-style";

const { Text } = Typography;

type ColumnBranchProps = {
  branch: string;
};

export const ColumnBranch = ({ branch }: ColumnBranchProps) => {
  const { styles } = useStyles();

  return (
    <>
      <BranchesOutlined className={styles.branchIcon} />
      <Text code className={styles.branchName}>
        {branch}
      </Text>
    </>
  );
};

const useStyles = createStyles(({ token }) => ({
  branchIcon: {
    color: token.colorTextSecondary,
    fontSize: 12,
  },
  branchName: {
    fontSize: 11,
  },
}));
