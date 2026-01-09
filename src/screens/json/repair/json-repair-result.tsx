import { Typography } from "antd";
import { createStyles } from "antd-style";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useResponsive } from "~/hooks/use-responsive";
import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";

import { getResultMaxHeight } from "./json-repair.utils";

interface JsonRepairResultProps {
  repairedJson: string;
}

export const JsonRepairResult = ({ repairedJson }: JsonRepairResultProps) => {
  const { styles } = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();
  const { isMobile, isTablet } = useResponsive();

  const maxHeight = getResultMaxHeight({ isMobile, isTablet });

  if (!repairedJson) {
    return (
      <div className={styles.placeholder}>
        <Typography.Text type="secondary">Repaired JSON will appear here</Typography.Text>
      </div>
    );
  }

  return (
    <div className={styles.resultSection}>
      <Typography.Text type="secondary" className={styles.resultLabel}>
        Repaired Result
      </Typography.Text>

      <div className={styles.resultBox} style={{ maxHeight }}>
        <SyntaxHighlighter
          language="json"
          style={syntaxTheme}
          customStyle={{
            margin: 0,
            padding: 16,
            background: "transparent",
            fontSize: isMobile ? 12 : 14,
          }}
          wrapLongLines={true}
        >
          {`\n${repairedJson}`}
        </SyntaxHighlighter>
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
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    overflow: "auto",
    width: "100%",
  },
  placeholder: {
    padding: 24,
    textAlign: "center",
    backgroundColor: token.colorBgContainer,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
