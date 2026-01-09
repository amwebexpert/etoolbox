import { Typography } from "antd";
import { createStyles } from "antd-style";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";
import { useResponsive } from "~/hooks/use-responsive";

interface JsonFormatterResultProps {
  formattedJson: string;
}

export const JsonFormatterResult = ({ formattedJson }: JsonFormatterResultProps) => {
  const { styles } = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();
  const { isMobile, isTablet } = useResponsive();

  if (!formattedJson) {
    return (
      <div className={styles.placeholder}>
        <Typography.Text type="secondary">Formatted JSON will appear here</Typography.Text>
      </div>
    );
  }

  const maxHeight = isMobile ? "300px" : isTablet ? "400px" : "500px";

  return (
    <div className={styles.resultSection}>
      <Typography.Text type="secondary" className={styles.resultLabel}>
        Formatted Result
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
          {`\n${formattedJson}`}
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
