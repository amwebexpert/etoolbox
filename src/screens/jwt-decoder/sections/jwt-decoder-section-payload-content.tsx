import { SyntaxHighlightBlock } from "~/components/ui/syntax-highlight-block";

import { type ExtendedJwtPayload, formatJson } from "../jwt-decoder.utils";

interface JwtDecoderSectionPayloadContentProps {
  payload: ExtendedJwtPayload | null;
  maxHeight: number;
}

export const JwtDecoderSectionPayloadContent = ({ payload, maxHeight }: JwtDecoderSectionPayloadContentProps) => {
  return <SyntaxHighlightBlock code={formatJson(payload)} maxHeight={maxHeight} variant="layout" />;
};
