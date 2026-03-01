import type { ClassAttributes, FunctionComponent, HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";

import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";
import { extractLanguageFromClassName } from "./code-block.utils";

type Props = ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps;

export const CodeBlock: FunctionComponent<Props> = ({ children, className, ...rest }) => {
  const syntaxTheme = useSyntaxHighlightTheme();
  const language = extractLanguageFromClassName(className);

  if (language) {
    return (
      <SyntaxHighlighter {...rest} PreTag="div" language={language} style={syntaxTheme} ref={undefined}>
        {String(children)}
      </SyntaxHighlighter>
    );
  }

  return (
    <code {...rest} className={className}>
      {children}
    </code>
  );
};
