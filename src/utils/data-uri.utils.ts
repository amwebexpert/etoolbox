import { getBase64ApproxSize, PeriodsInMS } from "@lichens-innovation/ts-common";
import { isImageMimeType, parseDataUri } from "@lichens-innovation/ts-common/mime";
import { base64ToBlob, type SaveBlobResult } from "@lichens-innovation/ts-common/web";
import prettyBytes from "pretty-bytes";

import { saveDataUriWithPicker } from "./save-file.utils";

export interface ImageMetadata {
  mimeType: string;
  ext: string;
  base64: string;
  sizeBytes: number;
  sizeFormatted: string;
}

export const getImageMetadata = (input: string): ImageMetadata | null => {
  const parsed = parseDataUri(input);
  if (!parsed) return null;
  if (!isImageMimeType(parsed.mimeType)) return null;

  const sizeBytes = getBase64ApproxSize(parsed.base64);

  return {
    mimeType: parsed.mimeType,
    ext: parsed.ext,
    base64: parsed.base64,
    sizeBytes,
    sizeFormatted: prettyBytes(sizeBytes),
  };
};

export const getNonImageDataUri = (input: string): string | null => {
  const parsed = parseDataUri(input);
  if (!parsed) return null;
  if (isImageMimeType(parsed.mimeType)) return null;

  return input;
};

export const openNonImageDataUri = (dataUri: string): void => {
  const parsed = parseDataUri(dataUri);
  if (!parsed) return;

  const blob = base64ToBlob({ base64: parsed.base64, mimeType: parsed.mimeType });
  const objectUrl = URL.createObjectURL(blob);
  window.open(objectUrl, "_blank", "noopener,noreferrer");
  setTimeout(() => URL.revokeObjectURL(objectUrl), PeriodsInMS.oneMinute);
};

export const getImageDownloadFilename = (ext: string): string => `image.${ext}`;

interface SaveImageDataUriArgs {
  dataUri: string;
  ext: string;
}

export const saveImageDataUri = ({ dataUri, ext }: SaveImageDataUriArgs): Promise<SaveBlobResult | null> =>
  saveDataUriWithPicker({ dataUri, fileName: getImageDownloadFilename(ext) });
