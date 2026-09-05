import { ResultBox, ResultPlaceholder, ResultSection } from "~/components/ui/result-section";
import { SyntaxHighlightBlock } from "~/components/ui/syntax-highlight-block";
import { useResponsive } from "~/hooks/use-responsive";
import { getResultMaxHeightPx } from "~/utils/responsive.utils";

interface JsonRepairResultProps {
  repairedJson: string;
}

export const JsonRepairResult = ({ repairedJson }: JsonRepairResultProps) => {
  const { isMobile, isTablet } = useResponsive();

  const maxHeight = getResultMaxHeightPx({ isMobile, isTablet });

  if (!repairedJson) {
    return <ResultPlaceholder message="Repaired JSON will appear here" />;
  }

  return (
    <ResultSection label="Repaired Result">
      <ResultBox style={{ maxHeight }}>
        <SyntaxHighlightBlock
          code={`\n${repairedJson}`}
          variant="bare"
          customStyle={{ fontSize: isMobile ? 12 : 14 }}
        />
      </ResultBox>
    </ResultSection>
  );
};
