import { Typography } from "antd";
import { createStyles } from "antd-style";

interface Base64StringResultProps {
  outputText: string;
}

export const Base64StringResult = ({ outputText }: Base64StringResultProps) => {
  const { styles } = useStyles();

  if (!outputText) return null;

  return (
    <div className={styles.resultSection}>
      <Typography.Text type="secondary" className={styles.resultLabel}>
        Result
      </Typography.Text>
      <div className={styles.resultBox}>
        <Typography.Text copyable={{ text: outputText }} className={styles.resultText}>
          {outputText}
        </Typography.Text>
      </div>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  resultSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  resultLabel: {
    fontWeight: 500,
  },
  resultBox: {
    padding: 16,
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    overflowX: "auto",
  },
  resultText: {
    fontFamily: "monospace",
    wordBreak: "break-all",
    whiteSpace: "pre-wrap",
  },
}));
