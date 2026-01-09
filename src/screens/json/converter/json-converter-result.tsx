import { Typography } from "antd";
import { createStyles } from "antd-style";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useResponsive } from "~/hooks/use-responsive";
import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";

import { getResultMaxHeight, getSyntaxHighlighterLanguage } from "./json-converter.utils";

interface JsonConverterResultProps {
  result: string;
  targetLanguage: string;
}

export const JsonConverterResult = ({ result, targetLanguage }: JsonConverterResultProps) => {
  const { styles } = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();
  const { isMobile, isTablet } = useResponsive();

  const maxHeight = getResultMaxHeight({ isMobile, isTablet });
  const syntaxLanguage = getSyntaxHighlighterLanguage(targetLanguage);

  if (!result) {
    return (
      <div className={styles.placeholder}>
        <Typography.Text type="secondary">Converted result will appear here</Typography.Text>
      </div>
    );
  }

  return (
    <div className={styles.resultSection}>
      <Typography.Text type="secondary" className={styles.resultLabel}>
        Converted Result
      </Typography.Text>

      <div className={styles.resultBox} style={{ maxHeight }}>
        <SyntaxHighlighter
          language={syntaxLanguage}
          style={syntaxTheme}
          customStyle={{
            margin: 0,
            padding: 16,
            background: "transparent",
          }}
          wrapLongLines={true}
        >
          {`\n${result}`}
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
