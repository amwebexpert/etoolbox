import { Alert, Space, Typography } from "antd";
import { createStyles } from "antd-style";

import type { PdfToMarkdownResult } from "./pdf-to-markdown.types";

interface PdfToMarkdownResultSummaryProps {
  result: PdfToMarkdownResult;
}

export const PdfToMarkdownResultSummary = ({ result: { pageCount, warnings } }: PdfToMarkdownResultSummaryProps) => {
  const { styles } = useStyles();

  return (
    <Space orientation="vertical" size="small" className={styles.fullWidth}>
      <Typography.Text type="secondary">
        {pageCount} page{pageCount === 1 ? "" : "s"} converted
      </Typography.Text>

      {warnings.length > 0 && (
        <Alert
          type="warning"
          showIcon
          title="Some content could not be converted"
          description={
            <ul className={styles.warnings}>
              {warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          }
        />
      )}
    </Space>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  warnings: {
    margin: 0,
    paddingLeft: 16,
  },
}));
