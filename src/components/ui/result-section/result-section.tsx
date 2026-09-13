import { Typography } from "antd";
import type { PropsWithChildren, ReactNode } from "react";

import { useStyles } from "./result-section.styles";

interface ResultSectionProps {
  label: string;
  trailing?: ReactNode;
}

export const ResultSection = ({ label, trailing, children }: PropsWithChildren<ResultSectionProps>) => {
  const { styles } = useStyles();

  return (
    <div className={styles.resultSection}>
      <div className={styles.labelRow}>
        <Typography.Text type="secondary" className={styles.resultLabel}>
          {label}
        </Typography.Text>
        {trailing}
      </div>
      {children}
    </div>
  );
};
