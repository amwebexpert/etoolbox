import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";

import { MarkdownContent } from "~/components/ui/markdown-content";

interface ResultCardContentProps {
  content: string;
}

export const ResultCardContent: FunctionComponent<ResultCardContentProps> = ({ content }) => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <MarkdownContent content={content} />
    </div>
  );
};

const useStyles = createStyles(() => ({
  container: {
    padding: 8,
  },
}));
