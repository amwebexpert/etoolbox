import { CodeOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { Base64StringResult } from "./base64-string-result";
import { Base64StringToolbar } from "./base64-string-toolbar";
import { useBase64StringStore } from "./base64-string.store";
import { decodeBase64, encodeBase64 } from "./base64-string.utils";

const { TextArea } = Input;

export const Base64String = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  const { inputText, outputText, setInputText, setOutputText, swapContent } = useBase64StringStore();

  const handleEncode = () => {
    const result = encodeBase64(inputText);
    setOutputText(result);
  };

  const handleDecode = () => {
    const result = decodeBase64(inputText);
    setOutputText(result);
  };

  const handleCopy = () => {
    copyTextToClipboard({ text: outputText });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value ?? "";
    setInputText(value);
    if (!value) {
      setOutputText("");
    }
  };

  return (
    <ScreenContainer>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<CodeOutlined />}
          title="Base64 String Encoder / Decoder"
          description="Encode and decode text strings to/from Base64 format"
        />

        <TextArea
          placeholder="Paste or type the text to encode/decode here"
          autoFocus={isDesktop}
          rows={isMobile ? 4 : 6}
          autoSize={{ minRows: 4, maxRows: isDesktop ? 20 : 6 }}
          value={inputText}
          onChange={handleInputChange}
          className={styles.textArea}
        />

        <Base64StringToolbar
          hasInput={!!inputText}
          hasOutput={!!outputText}
          onSwap={swapContent}
          onCopy={handleCopy}
          onEncode={handleEncode}
          onDecode={handleDecode}
        />

        <Base64StringResult outputText={outputText} />
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  textArea: {
    fontFamily: "monospace",
  },
}));
