import { SyntaxHighlightBlock } from "~/components/ui/syntax-highlight-block";

import { formatJson, type JwtHeader } from "../jwt-decoder.utils";

interface JwtDecoderSectionHeaderContentProps {
  header: JwtHeader | null;
  maxHeight: number;
}

export const JwtDecoderSectionHeaderContent = ({ header, maxHeight }: JwtDecoderSectionHeaderContentProps) => {
  return <SyntaxHighlightBlock code={formatJson(header)} maxHeight={maxHeight} variant="layout" />;
};
