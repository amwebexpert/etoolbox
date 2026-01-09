import type { ReactNode } from "react";
import { createStyles } from "antd-style";

interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
}

export const ScreenContainer = ({ children, className }: ScreenContainerProps) => {
  const { styles, cx } = useStyles();

  return <div className={cx(styles.container, className)}>{children}</div>;
};

const useStyles = createStyles(() => ({
  container: {
    paddingTop: 16,
    paddingBottom: 48,
    maxWidth: 1200,
    margin: "0 auto",
  },
}));
