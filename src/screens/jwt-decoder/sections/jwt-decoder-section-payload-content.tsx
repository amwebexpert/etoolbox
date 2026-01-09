import { createStyles } from "antd-style";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";

import { formatJson, type ExtendedJwtPayload } from "../jwt-decoder.utils";

interface JwtDecoderSectionPayloadContentProps {
  payload: ExtendedJwtPayload | null;
  maxHeight: number;
}

export const JwtDecoderSectionPayloadContent = ({ payload, maxHeight }: JwtDecoderSectionPayloadContentProps) => {
  const { styles } = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();

  return (
    <div className={styles.codeBlock} style={{ maxHeight }}>
      <SyntaxHighlighter
        language="json"
        style={syntaxTheme}
        customStyle={{
          margin: 0,
          padding: 16,
          background: "transparent",
        }}
        wrapLongLines
      >
        {formatJson(payload)}
      </SyntaxHighlighter>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  codeBlock: {
    overflow: "auto",
    borderRadius: token.borderRadius,
    backgroundColor: token.colorBgLayout,
  },
}));
