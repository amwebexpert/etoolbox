import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import { createStyles } from "antd-style";
import SyntaxHighlighter from "react-syntax-highlighter";

import type { CodeExample } from "../date-converter.utils";

interface CodeExampleCardProps {
  example: CodeExample;
  date: Date;
  onCopy: (value: string, label: string) => void;
  syntaxTheme: Record<string, React.CSSProperties>;
}

export const CodeExampleCard = ({ example, date, onCopy, syntaxTheme }: CodeExampleCardProps) => {
  const { styles } = useStyles();
  const code = example.getCode(date);

  return (
    <Card size="small" className={styles.codeExampleCard}>
      <div className={styles.cardHeader}>
        <Typography.Text strong>{example.label}</Typography.Text>
        <Button type="text" size="small" icon={<CopyOutlined />} onClick={() => onCopy(code, example.label)} />
      </div>
      <SyntaxHighlighter
        language="javascript"
        style={syntaxTheme}
        customStyle={{
          margin: 0,
          marginTop: 8,
          padding: 12,
          fontSize: 12,
          borderRadius: 4,
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </Card>
  );
};

const useStyles = createStyles(() => ({
  codeExampleCard: {
    marginBottom: 12,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
}));
