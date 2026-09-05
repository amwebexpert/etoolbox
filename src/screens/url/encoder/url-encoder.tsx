import { CodeOutlined } from "@ant-design/icons";

import { EncodeDecodeScreen } from "~/components/ui/encode-decode-screen";
import { useEncodeDecodeHandlers } from "~/hooks/use-encode-decode-handlers";

import { useUrlEncoderStore } from "./url-encoder.store";
import { transformUrl } from "./url-encoder.utils";

export const UrlEncoder = () => {
  const { inputText, outputText, setInputText, setOutputText, swapContent } = useUrlEncoderStore();

  const handlers = useEncodeDecodeHandlers({
    inputText,
    outputText,
    setInputText,
    setOutputText,
    encode: (value) => transformUrl({ value, decode: false }),
    decode: (value) => transformUrl({ value, decode: true }),
  });

  return (
    <EncodeDecodeScreen
      icon={<CodeOutlined />}
      title="URL Encoder / Decoder"
      description="Encode and decode URL strings using encodeURIComponent / decodeURIComponent"
      inputPlaceholder="Paste or type the content to encode/decode here"
      inputText={inputText}
      outputText={outputText}
      onSwap={swapContent}
      {...handlers}
    />
  );
};
