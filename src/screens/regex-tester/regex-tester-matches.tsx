import { Typography } from "antd";
import { createStyles } from "antd-style";

import { ResultSection } from "~/components/ui/result-section";

interface RegexTesterMatchesProps {
  highlightedHtml: string;
  matchCount: number;
  error: string | null;
}

export const RegexTesterMatches = ({ highlightedHtml, matchCount, error }: RegexTesterMatchesProps) => {
  const { styles } = useStyles();

  if (error) {
    return (
      <ResultSection label="Error">
        <div className={styles.errorBox}>
          <Typography.Text type="danger">{error}</Typography.Text>
        </div>
      </ResultSection>
    );
  }

  return (
    <ResultSection
      label="Matches Preview"
      trailing={
        matchCount > 0 ? (
          <Typography.Text type="secondary" className={styles.count}>
            {matchCount} match{matchCount !== 1 ? "es" : ""} found
          </Typography.Text>
        ) : undefined
      }
    >
      <div
        className={styles.matchesBox}
        // highlightedHtml is built in regex-tester.utils.ts via transformWithHighlights, which runs the raw
        // text through escapeHtml() before wrapping matches in static <span> tags; the only literal markup
        // here is that hardcoded wrapper and the static placeholder below, so no unescaped user input ever
        // reaches the DOM.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: highlightedHtml || '<span class="placeholder">Matches will be highlighted here</span>',
        }}
      />
    </ResultSection>
  );
};

const useStyles = createStyles(({ token }) => ({
  count: {
    fontSize: 12,
  },
  matchesBox: {
    padding: 16,
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    fontFamily: "monospace",
    fontSize: 14,
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxHeight: 300,
    overflow: "auto",

    "& .regex-match": {
      backgroundColor: token.colorWarningBg,
      color: token.colorWarningText,
      fontWeight: 600,
      padding: "1px 2px",
      borderRadius: 2,
      border: `1px solid ${token.colorWarningBorder}`,
    },

    "& .placeholder": {
      color: token.colorTextDisabled,
      fontStyle: "italic",
    },
  },
  errorBox: {
    padding: 16,
    backgroundColor: token.colorErrorBg,
    border: `1px solid ${token.colorErrorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
