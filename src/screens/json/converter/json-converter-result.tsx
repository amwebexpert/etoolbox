import { ResultBox, ResultPlaceholder, ResultSection } from "~/components/ui/result-section";
import { SyntaxHighlightBlock } from "~/components/ui/syntax-highlight-block";
import { useResponsive } from "~/hooks/use-responsive";
import { getResultMaxHeightPx } from "~/utils/responsive.utils";

import { getSyntaxHighlighterLanguage } from "./json-converter.utils";

interface JsonConverterResultProps {
  result: string;
  targetLanguage: string;
}

export const JsonConverterResult = ({ result, targetLanguage }: JsonConverterResultProps) => {
  const { isMobile, isTablet } = useResponsive();

  const maxHeight = getResultMaxHeightPx({ isMobile, isTablet });
  const syntaxLanguage = getSyntaxHighlighterLanguage(targetLanguage);

  if (!result) {
    return <ResultPlaceholder message="Converted result will appear here" />;
  }

  return (
    <ResultSection label="Converted Result">
      <ResultBox style={{ maxHeight }}>
        <SyntaxHighlightBlock code={`\n${result}`} language={syntaxLanguage} variant="bare" />
      </ResultBox>
    </ResultSection>
  );
};
