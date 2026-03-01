import { Collapse, Empty, Spin } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";
import type { Rule } from "../coding-standards.types";
import { ResultCardContent } from "./result-card-content";
import { ResultCardTitle } from "./result-card-title";

interface ResultsListProps {
  results: Rule[];
  isLoading: boolean;
}

export const ResultsList: FunctionComponent<ResultsListProps> = ({ results, isLoading }) => {
  const { styles } = useStyles();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Spin size="large" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={styles.container}>
        <Empty description="No results found. Try a different search query." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Collapse
        className={styles.collapse}
        accordion={false}
        defaultActiveKey={results.length > 0 ? [results[0].href] : []}
        size="small"
        items={results.map((rule) => ({
          key: rule.href,
          label: <ResultCardTitle rule={rule} />,
          children: <ResultCardContent content={rule.content} />,
        }))}
      />
    </div>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
  collapse: {
    width: "100%",
  },
}));
