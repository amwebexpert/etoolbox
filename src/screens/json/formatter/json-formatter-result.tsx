import { Typography } from "antd";
import { createStyles } from "antd-style";
import ReactJsonImport from "react-json-view";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useResponsive } from "~/hooks/use-responsive";
import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";

import { useJsonFormatterStore } from "./json-formatter.store";
import { parseJsonForView } from "./json-formatter.utils";

// Handle potential default export wrapper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactJson = (ReactJsonImport as any)?.default || ReactJsonImport;

interface JsonFormatterResultProps {
  formattedJson: string;
}

export const JsonFormatterResult = ({ formattedJson }: JsonFormatterResultProps) => {
  const { styles } = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();
  const { isMobile, isTablet } = useResponsive();
  const { viewMode, reactJsonConfig } = useJsonFormatterStore();

  if (!formattedJson) {
    return (
      <div className={styles.placeholder}>
        <Typography.Text type="secondary">Formatted JSON will appear here</Typography.Text>
      </div>
    );
  }

  const maxHeight = isMobile ? "300px" : isTablet ? "400px" : "500px";
  const jsonObject = parseJsonForView(formattedJson);

  return (
    <div className={styles.resultSection}>
      <Typography.Text type="secondary" className={styles.resultLabel}>
        Formatted Result
      </Typography.Text>

      <div className={styles.resultBox} style={{ maxHeight }}>
        {viewMode === "react-json-view" && jsonObject ? (
          <div className={styles.reactJsonContainer}>
            <ReactJson
              src={jsonObject}
              theme={reactJsonConfig.theme}
              iconStyle={reactJsonConfig.iconStyle}
              indentWidth={reactJsonConfig.indentWidth}
              collapsed={reactJsonConfig.collapsed}
              displayDataTypes={reactJsonConfig.displayDataTypes}
              displayObjectSize={reactJsonConfig.displayObjectSize}
              enableClipboard={reactJsonConfig.enableClipboard}
              quotesOnKeys={reactJsonConfig.quotesOnKeys}
              collapseStringsAfterLength={reactJsonConfig.collapseStringsAfterLength || false}
              groupArraysAfterLength={reactJsonConfig.groupArraysAfterLength}
              sortKeys={reactJsonConfig.sortKeys}
              name={false}
              style={{
                padding: 16,
                fontSize: isMobile ? 12 : 14,
                fontFamily: "monospace",
              }}
            />
          </div>
        ) : (
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
        )}
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
  reactJsonContainer: {
    "& .react-json-view": {
      backgroundColor: "transparent !important",
    },
  },
  placeholder: {
    padding: 24,
    textAlign: "center",
    backgroundColor: token.colorBgContainer,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
