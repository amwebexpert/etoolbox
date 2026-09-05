import type { ChangeEvent } from "react";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";

interface UseEncodeDecodeHandlersArgs {
  inputText: string;
  outputText: string;
  setInputText: (text: string) => void;
  setOutputText: (text: string) => void;
  encode: (input: string) => string;
  decode: (input: string) => string;
}

export const useEncodeDecodeHandlers = ({
  inputText,
  outputText,
  setInputText,
  setOutputText,
  encode,
  decode,
}: UseEncodeDecodeHandlersArgs) => {
  const { copyTextToClipboard } = useClipboardCopy();

  const onEncode = () => {
    setOutputText(encode(inputText));
  };

  const onDecode = () => {
    setOutputText(decode(inputText));
  };

  const onCopy = () => {
    void copyTextToClipboard({ text: outputText });
  };

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value ?? "";
    setInputText(value);
    if (!value) {
      setOutputText("");
    }
  };

  return { onEncode, onDecode, onCopy, onInputChange };
};
