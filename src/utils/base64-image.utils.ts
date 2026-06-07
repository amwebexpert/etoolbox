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

export const getNonImageDataUri = (input: string): string | null => {
  const parsed = parseDataUri(input);
  if (!parsed) return null;
  if (isImageMimeType(parsed.mimeType)) return null;

  return input;
};

export const mimeToExt = (mimeType: string): string => {
  const mapped = MIME_TO_EXT_MAP[mimeType];
  if (mapped) return mapped;

  const subtype = mimeType.split("/")[1] ?? mimeType;
  return subtype.split("+")[0] ?? subtype;
};
