import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";

import { CodeBlock } from "./code-block";

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: FunctionComponent<MarkdownContentProps> = ({ content }) => {
  const { styles } = useStyles();

  return (
    <ReactMarkdown
      components={{
        code: (props) => <CodeBlock {...props} />,
        p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
        ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const useStyles = createStyles(() => ({
  paragraph: {
    marginTop: 16,
    marginBottom: 16,
  },
  list: {
    marginLeft: 8,
    paddingLeft: 16,
  },
}));
