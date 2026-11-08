import type { SaveBlobResult } from "@lichens-innovation/ts-common/web";

import { useToastMessage } from "./use-toast-message";

export const getSavedFileMessage = ({ method, fileName }: SaveBlobResult): string =>
  method === "picker" ? `File saved: ${fileName}` : `File downloaded: ${fileName}`;

export const useSavedFileToast = () => {
  const messageApi = useToastMessage();

  const notifySavedFile = (result: SaveBlobResult | null): void => {
    if (!result) return;
    messageApi.success(getSavedFileMessage(result));
  };

  return { notifySavedFile };
};
