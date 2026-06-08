import { getBase64ApproxSize } from "@lichens-innovation/ts-common";
import { isImageMimeType, mimeToExt, parseDataUri } from "@lichens-innovation/ts-common/mime";
import { downloadDataUrl } from "@lichens-innovation/ts-common/web";
import prettyBytes from "pretty-bytes";

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

export const getImageDownloadFilename = (ext: string): string => `image.${ext}`;

interface DownloadImageDataUriArgs {
  dataUri: string;
  ext: string;
}

export const downloadImageDataUri = ({ dataUri, ext }: DownloadImageDataUriArgs): void => {
  downloadDataUrl({ dataUrl: dataUri, fileName: getImageDownloadFilename(ext) });
};

export { mimeToExt };
