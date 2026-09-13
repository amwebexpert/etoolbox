import type { CSSProperties, PropsWithChildren } from "react";

import { useStyles } from "./result-section.styles";

interface ResultBoxProps {
  style?: CSSProperties;
  className?: string;
  variant?: "default" | "padded";
}

export const ResultBox = ({ children, style, className, variant = "default" }: PropsWithChildren<ResultBoxProps>) => {
  const { styles, cx } = useStyles();

  return (
    <div className={cx(styles.resultBox, variant === "padded" && styles.resultBoxPadded, className)} style={style}>
      {children}
    </div>
  );
};
