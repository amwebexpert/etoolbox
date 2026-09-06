import { Input, Space } from "antd";
import type { ChangeEvent, ReactNode } from "react";

import { EncodeDecodeToolbar } from "~/components/ui/encode-decode-toolbar";
import { CopyableResultText, ResultBox, ResultSection } from "~/components/ui/result-section";
import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";
import { useScreenFormStyles } from "~/styles/screen-form.styles";

const { TextArea } = Input;

interface EncodeDecodeScreenArgs {
  icon: ReactNode;
  title: string;
  description: string;
  inputPlaceholder: string;
  inputText: string;
  outputText: string;
  onInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSwap: () => void;
  onCopy: () => void;
  onEncode: () => void;
  onDecode: () => void;
}

export const EncodeDecodeScreen = ({
  icon,
  title,
  description,
  inputPlaceholder,
  inputText,
  outputText,
  onInputChange,
  onSwap,
  onCopy,
  onEncode,
  onDecode,
}: EncodeDecodeScreenArgs) => {
  const { styles } = useScreenFormStyles();
  const { isDesktop, isMobile } = useResponsive();

  return (
    <ScreenContainer>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader icon={icon} title={title} description={description} />

        <TextArea
          placeholder={inputPlaceholder}
          autoFocus={isDesktop}
          rows={isMobile ? 4 : 6}
          autoSize={{ minRows: 4, maxRows: isDesktop ? 20 : 6 }}
          value={inputText}
          onChange={onInputChange}
          className={styles.textArea}
        />

        <EncodeDecodeToolbar
          hasInput={!!inputText}
          hasOutput={!!outputText}
          onSwap={onSwap}
          onCopy={onCopy}
          onEncode={onEncode}
          onDecode={onDecode}
        />

        {!!outputText && (
          <ResultSection label="Result">
            <ResultBox variant="padded">
              <CopyableResultText text={outputText} />
            </ResultBox>
          </ResultSection>
        )}
      </Space>
    </ScreenContainer>
  );
};
