import { Select, Typography } from "antd";
import { createStyles } from "antd-style";

import { EXTRACT_FORMAT_OPTIONS, formatExtractedValues, type ExtractFormat } from "./regex-tester.utils";

interface RegexTesterExtractedProps {
  matches: string[];
  uniqueCount: number;
  extractFormat: ExtractFormat;
  onFormatChange: (format: ExtractFormat) => void;
}

export const RegexTesterExtracted = ({
  matches,
  uniqueCount,
  extractFormat,
  onFormatChange,
}: RegexTesterExtractedProps) => {
  const { styles } = useStyles();

  const formattedValue = formatExtractedValues({ matches, format: extractFormat });
  const hasMatches = matches.length > 0;

  return (
    <div className={styles.section}>
      <div className={styles.labelRow}>
        <Typography.Text type="secondary" className={styles.label}>
          Extracted Values
        </Typography.Text>

        <div className={styles.controls}>
          {hasMatches && (
            <Typography.Text type="secondary" className={styles.count}>
              {matches.length} total, {uniqueCount} unique
            </Typography.Text>
          )}

          <Select
            size="small"
            value={extractFormat}
            onChange={onFormatChange}
            options={EXTRACT_FORMAT_OPTIONS}
            className={styles.formatSelect}
          />
        </div>
      </div>

      <div className={styles.extractedBox}>
        {hasMatches ? (
          <pre className={styles.extractedContent}>{formattedValue}</pre>
        ) : (
          <Typography.Text type="secondary" className={styles.placeholder}>
            Extracted values will appear here
          </Typography.Text>
        )}
      </div>

      <Typography.Text type="secondary" className={styles.hint}>
        💡 Tip: Use format like <code>/pattern/g</code> or select flags above. The Jira format is useful for expressions
        like: <strong>issueKey in (FS-3456, WS-3213, FS-9988)</strong>
      </Typography.Text>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  section: {
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
  label: {
    fontWeight: 500,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  count: {
    fontSize: 12,
  },
  formatSelect: {
    minWidth: 160,
  },
  extractedBox: {
    padding: 16,
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    maxHeight: 200,
    overflow: "auto",
  },
  extractedContent: {
    margin: 0,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  placeholder: {
    fontStyle: "italic",
  },
  hint: {
    fontSize: 12,

    "& code": {
      backgroundColor: token.colorBgTextHover,
      padding: "1px 4px",
      borderRadius: 3,
      fontFamily: "monospace",
    },
  },
}));
