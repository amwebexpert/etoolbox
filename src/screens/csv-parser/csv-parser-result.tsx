import { Typography } from "antd";
import { createStyles } from "antd-style";

import type { CsvParseResult, ViewMode } from "./csv-parser.types";
import { CsvParserResultTable } from "./csv-parser-result-table";
import { CsvParserResultJson } from "./csv-parser-result-json";

interface CsvParserResultProps {
  result: CsvParseResult | null;
  viewMode: ViewMode;
}

export const CsvParserResult = ({ result, viewMode }: CsvParserResultProps) => {
  const { styles } = useStyles();

  if (!result) {
    return (
      <div className={styles.placeholder}>
        <Typography.Text type="secondary">Parsed result will appear here</Typography.Text>
      </div>
    );
  }

  if (viewMode === "table") {
    return <CsvParserResultTable result={result} />;
  }

  return <CsvParserResultJson result={result} />;
};

const useStyles = createStyles(({ token }) => ({
  placeholder: {
    padding: 24,
    textAlign: "center",
    backgroundColor: token.colorBgContainer,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
