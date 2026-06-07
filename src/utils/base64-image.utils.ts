import prettyBytes from "pretty-bytes";

import { downloadDataUrl } from "./download.utils";
import { getBase64ApproxSize } from "./encoding.utils";
import { VALID_IMAGE_TYPES } from "./image.utils";

const DATA_URI_PATTERN = /^data:([\w.+-]+\/[\w.+-]+);base64,(.+)$/;

const MIME_TO_EXT_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
};

export interface ParseDataUriResult {
  mimeType: string;
  base64: string;
  ext: string;
}

export const parseDataUri = (input: string): ParseDataUriResult | null => {
  if (!input) return null;

  const match = DATA_URI_PATTERN.exec(input);
  if (!match) return null;

  const [, mimeType, base64] = match;
  if (!mimeType || !base64) return null;

  return { mimeType, base64, ext: mimeToExt(mimeType) };
};

export const isImageMimeType = (mimeType: string): boolean => {
  return VALID_IMAGE_TYPES.includes(mimeType);
};

export const getImagePreviewSrc = (input: string): string | null => {
  const parsed = parseDataUri(input);
  if (!parsed) return null;
  if (!isImageMimeType(parsed.mimeType)) return null;

  return input;
};

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

export const getImageDownloadFilename = (ext: string): string => `image.${ext}`;

interface DownloadImageDataUriArgs {
  dataUri: string;
  ext: string;
}

export const downloadImageDataUri = ({ dataUri, ext }: DownloadImageDataUriArgs): void => {
  downloadDataUrl({ dataUrl: dataUri, fileName: getImageDownloadFilename(ext) });
};

export const loadImageDimensions = (dataUri: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUri;
  });
};

export const mimeToExt = (mimeType: string): string => {
  const mapped = MIME_TO_EXT_MAP[mimeType];
  if (mapped) return mapped;

  const subtype = mimeType.split("/")[1] ?? mimeType;
  return subtype.split("+")[0] ?? subtype;
};
