import { dataUrlToPngBlob } from "~/utils/image.utils";

export const copyTextToClipboard = async (text: string): Promise<void> => {
  await navigator.clipboard.writeText(text);
};

export const copyImageToClipboard = async (dataUrl: string): Promise<void> => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();

  const pngBlob = blob.type === "image/png" ? blob : await dataUrlToPngBlob(dataUrl);

  await navigator.clipboard.write([new ClipboardItem({ "image/png": pngBlob })]);
};
