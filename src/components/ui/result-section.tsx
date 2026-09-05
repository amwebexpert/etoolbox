import { Typography } from "antd";
import { createStyles } from "antd-style";
import type { CSSProperties, PropsWithChildren, ReactNode } from "react";

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

const useStyles = createStyles(({ token }) => ({
  resultSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  resultLabel: {
    fontWeight: 500,
  },
  resultBox: {
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    overflow: "auto",
    width: "100%",
  },
  resultBoxPadded: {
    padding: 16,
    overflowX: "auto",
  },
  resultText: {
    fontFamily: "monospace",
    wordBreak: "break-all",
    whiteSpace: "pre-wrap",
  },
  placeholder: {
    padding: 24,
    textAlign: "center",
    backgroundColor: token.colorBgContainer,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
