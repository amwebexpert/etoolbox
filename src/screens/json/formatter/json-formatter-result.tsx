import { createStyles } from "antd-style";
import ReactJsonImport from "react-json-view";

import { ResultBox, ResultPlaceholder, ResultSection } from "~/components/ui/result-section";
import { SyntaxHighlightBlock } from "~/components/ui/syntax-highlight-block";
import { useResponsive } from "~/hooks/use-responsive";
import { getResultMaxHeightPx } from "~/utils/responsive.utils";

import { useJsonFormatterStore } from "./json-formatter.store";
import { parseJsonForView } from "./json-formatter.utils";

// Handle potential default export wrapper habit-hooks-disable non-essential-comment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactJson = (ReactJsonImport as any)?.default ?? ReactJsonImport;

interface JsonFormatterResultProps {
  formattedJson: string;
}

export const JsonFormatterResult = ({ formattedJson }: JsonFormatterResultProps) => {
  const { styles } = useStyles();
  const { isMobile, isTablet } = useResponsive();
  const { viewMode, reactJsonConfig } = useJsonFormatterStore();
  const fontSize = isMobile ? 12 : 14;

  if (!formattedJson) {
    return <ResultPlaceholder message="Formatted JSON will appear here" />;
  }

  const maxHeight = getResultMaxHeightPx({ isMobile, isTablet });
  const jsonObject = parseJsonForView(formattedJson);

  return (
    <ResultSection label="Formatted Result">
      <ResultBox style={{ maxHeight }}>
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
              style={{ padding: 16, fontSize, fontFamily: "monospace" }}
            />
          </div>
        ) : (
          <SyntaxHighlightBlock code={`\n${formattedJson}`} variant="bare" customStyle={{ fontSize }} />
        )}
      </ResultBox>
    </ResultSection>
  );
};

const useStyles = createStyles(() => ({
  reactJsonContainer: {
    "& .react-json-view": {
      backgroundColor: "transparent !important",
    },
  },
}));
