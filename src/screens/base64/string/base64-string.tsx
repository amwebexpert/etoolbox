import { CodeOutlined } from "@ant-design/icons";

import { EncodeDecodeScreen } from "~/components/ui/encode-decode-screen";
import { useEncodeDecodeHandlers } from "~/hooks/use-encode-decode-handlers";

import { useBase64StringStore } from "./base64-string.store";
import { decodeBase64, encodeBase64 } from "./base64-string.utils";

export const Base64String = () => {
  const { inputText, outputText, setInputText, setOutputText, swapContent } = useBase64StringStore();

  const handlers = useEncodeDecodeHandlers({
    inputText,
    outputText,
    setInputText,
    setOutputText,
    encode: encodeBase64,
    decode: decodeBase64,
  });

  return (
    <EncodeDecodeScreen
      icon={<CodeOutlined />}
      title="Base64 String Encoder / Decoder"
      description="Encode and decode text strings to/from Base64 format"
      inputPlaceholder="Paste or type the text to encode/decode here"
      inputText={inputText}
      outputText={outputText}
      onSwap={swapContent}
      {...handlers}
    />
  );
};
