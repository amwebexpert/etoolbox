import { createStyles } from "antd-style";
import type { ReactNode } from "react";

interface ScreenToolbarProps {
  leading?: ReactNode;
  actions: ReactNode;
}

export const ScreenToolbar = ({ leading, actions }: ScreenToolbarProps) => {
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      {leading}
      <div className={styles.spacer} />
      {actions}
    </div>
  );
};

const useStyles = createStyles(() => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  spacer: {
    flex: 1,
  },
}));
