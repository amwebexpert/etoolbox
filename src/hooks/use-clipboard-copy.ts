import { getErrorMessage, isBlank } from "@lichens-innovation/ts-common";

import { useToastMessage } from "~/providers/toast-message-provider";
import * as clipboardUtils from "~/utils/clipboard.utils";

interface CopyTextToClipboardArgs {
  text: string | undefined | null;
  successMessage?: string;
}

interface CopyImageToClipboardArgs {
  dataUrl: string;
  successMessage?: string;
}

export const useClipboardCopy = () => {
  const messageApi = useToastMessage();

  const copyTextToClipboard = async ({ text, successMessage = "Copied to clipboard!" }: CopyTextToClipboardArgs) => {
    if (isBlank(text)) return;

    try {
      await clipboardUtils.copyTextToClipboard(text);
      messageApi.success(successMessage);
    } catch (e: unknown) {
      messageApi.error("Failed to copy to clipboard: " + getErrorMessage(e));
    }
  };

  const copyImageToClipboard = async ({
    dataUrl,
    successMessage = "Image copied to clipboard!",
  }: CopyImageToClipboardArgs) => {
    if (isBlank(dataUrl)) return;

    try {
      await clipboardUtils.copyImageToClipboard(dataUrl);
      messageApi.success(successMessage);
    } catch (e: unknown) {
      messageApi.error("Failed to copy image to clipboard: " + getErrorMessage(e));
    }
  };

  return { copyTextToClipboard, copyImageToClipboard };
};
