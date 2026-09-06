import { CodeOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { createStyles } from "antd-style";

import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";

import type { CopyHandlerArgs } from "../date-converter.constants";
import { CODE_EXAMPLES, DATE_FORMATS } from "../date-converter.utils";
import { CodeExampleCard } from "./code-example-card";
import { DateFormatCard } from "./date-format-card";

interface ResultMobileLayoutProps {
  date: Date;
  epochValue: number;
  showCodeExamples: boolean;
  onCopy: (args: CopyHandlerArgs) => void;
}

export const ResultMobileLayout = ({ date, epochValue, showCodeExamples, onCopy }: ResultMobileLayoutProps) => {
  const { styles } = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();

  return (
    <div className={styles.cardsContainer}>
      {DATE_FORMATS.map((format) => (
        <DateFormatCard key={format.id} format={format} date={date} epochValue={epochValue} onCopy={onCopy} />
      ))}

      {showCodeExamples ? (
        <div className={styles.codeExamplesSection}>
          <Typography.Title level={5} className={styles.codeExamplesTitle}>
            <CodeOutlined /> Code Examples
          </Typography.Title>
          {CODE_EXAMPLES.map((example) => (
            <CodeExampleCard key={example.id} example={example} date={date} onCopy={onCopy} syntaxTheme={syntaxTheme} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const useStyles = createStyles(() => ({
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  codeExamplesSection: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 8,
  },
  codeExamplesTitle: {
    margin: 0,
  },
}));
