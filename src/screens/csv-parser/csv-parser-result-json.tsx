import { Typography } from "antd";
import { createStyles } from "antd-style";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useResponsive } from "~/hooks/use-responsive";
import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";
import { safeJsonStringify } from "~/utils/json.utils";

import type { CsvParseResult } from "./csv-parser.types";

interface CsvParserResultJsonProps {
  result: CsvParseResult;
}

export const CsvParserResultJson = ({ result }: CsvParserResultJsonProps) => {
  const { styles } = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();
  const { isMobile, isTablet } = useResponsive();

  const maxHeight = isMobile ? 300 : isTablet ? 400 : 500;
  const jsonOutput = safeJsonStringify(result.data);

  return (
    <div className={styles.resultSection}>
      <Typography.Text type="secondary" className={styles.resultLabel}>
        Parsed Data (JSON)
      </Typography.Text>

      <div className={styles.resultBox} style={{ maxHeight }}>
        <SyntaxHighlighter
          language="json"
          style={syntaxTheme}
          customStyle={{
            margin: 0,
            padding: 16,
            background: "transparent",
          }}
          wrapLongLines={true}
        >
          {`\n${jsonOutput}`}
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
}));
