import { createStyles } from "antd-style";
import type { CSSProperties } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";

interface SyntaxHighlightBlockProps {
  code: string;
  language?: string;
  maxHeight?: number | string;
  customStyle?: CSSProperties;
  className?: string;
  wrapLongLines?: boolean;
  variant?: "container" | "layout" | "bare";
}

export const SyntaxHighlightBlock = ({
  code,
  language = "json",
  maxHeight,
  customStyle,
  className,
  wrapLongLines = true,
  variant = "container",
}: SyntaxHighlightBlockProps) => {
  const { styles, cx } = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();

  const blockClassName = cx(
    variant === "layout" && styles.codeBlockLayout,
    variant === "container" && styles.codeBlock,
    variant === "bare" && styles.codeBlockBare,
    className
  );

  return (
    <div className={blockClassName} style={{ maxHeight }}>
      <SyntaxHighlighter
        language={language}
        style={syntaxTheme}
        customStyle={{
          margin: 0,
          padding: 16,
          background: "transparent",
          ...customStyle,
        }}
        wrapLongLines={wrapLongLines}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  codeBlock: {
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    overflow: "auto",
    width: "100%",
  },
  codeBlockLayout: {
    overflow: "auto",
    borderRadius: token.borderRadius,
    backgroundColor: token.colorBgLayout,
  },
  codeBlockBare: {
    overflow: "auto",
  },
}));
