import { CodeOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { createStyles } from "antd-style";

import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";

import { CODE_EXAMPLES, DATE_FORMATS } from "../date-converter.utils";
import { CodeExampleCard } from "./code-example-card";
import { DateFormatCard } from "./date-format-card";

interface ResultMobileLayoutProps {
  date: Date;
  epochValue: number;
  showCodeExamples: boolean;
  onCopy: (value: string, label: string) => void;
}

export const ResultMobileLayout = ({ date, epochValue, showCodeExamples, onCopy }: ResultMobileLayoutProps) => {
  const { styles } = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();

  return (
    <div className={styles.cardsContainer}>
      {DATE_FORMATS.map((format) => (
        <DateFormatCard key={format.id} format={format} date={date} epochValue={epochValue} onCopy={onCopy} />
      ))}

      {showCodeExamples && (
        <Collapse
          className={styles.codeExamplesCollapse}
          items={[
            {
              key: "code-examples",
              label: (
                <span>
                  <CodeOutlined /> Code Examples
                </span>
              ),
              children: (
                <>
                  {CODE_EXAMPLES.map((example) => (
                    <CodeExampleCard
                      key={example.id}
                      example={example}
                      date={date}
                      onCopy={onCopy}
                      syntaxTheme={syntaxTheme}
                    />
                  ))}
                </>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

const useStyles = createStyles(() => ({
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  codeExamplesCollapse: {
    marginTop: 8,
  },
}));
