import { Typography } from "antd";
import { createStyles } from "antd-style";

interface RegexTesterMatchesProps {
  highlightedHtml: string;
  matchCount: number;
  error: string | null;
}

export const RegexTesterMatches = ({ highlightedHtml, matchCount, error }: RegexTesterMatchesProps) => {
  const { styles } = useStyles();

  if (error) {
    return (
      <div className={styles.section}>
        <Typography.Text type="secondary" className={styles.label}>
          Error
        </Typography.Text>
        <div className={styles.errorBox}>
          <Typography.Text type="danger">{error}</Typography.Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.labelRow}>
        <Typography.Text type="secondary" className={styles.label}>
          Matches Preview
        </Typography.Text>
        {matchCount > 0 && (
          <Typography.Text type="secondary" className={styles.count}>
            {matchCount} match{matchCount !== 1 ? "es" : ""} found
          </Typography.Text>
        )}
      </div>

      <div
        className={styles.matchesBox}
        dangerouslySetInnerHTML={{
          __html: highlightedHtml || '<span class="placeholder">Matches will be highlighted here</span>',
        }}
      />
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
