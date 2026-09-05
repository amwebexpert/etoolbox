import { safeJsonStringify } from "@lichens-innovation/ts-common";

import { ResultBox, ResultSection } from "~/components/ui/result-section";
import { SyntaxHighlightBlock } from "~/components/ui/syntax-highlight-block";
import { useResponsive } from "~/hooks/use-responsive";
import { getResultMaxHeight } from "~/utils/responsive.utils";

import type { CsvParseResult } from "./csv-parser.types";

interface CsvParserResultJsonProps {
  result: CsvParseResult;
}

export const CsvParserResultJson = ({ result }: CsvParserResultJsonProps) => {
  const { isMobile, isTablet } = useResponsive();

  const maxHeight = getResultMaxHeight({ isMobile, isTablet });
  const jsonOutput = safeJsonStringify(result.data);

  return (
    <ResultSection label="Parsed Data (JSON)">
      <ResultBox style={{ maxHeight }}>
        <SyntaxHighlightBlock code={`\n${jsonOutput}`} variant="bare" />
      </ResultBox>
    </ResultSection>
  );
};
