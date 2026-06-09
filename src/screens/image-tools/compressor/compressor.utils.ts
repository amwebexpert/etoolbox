import { mimeToExt } from "@lichens-innovation/ts-common/mime";
import Compressor from "compressorjs";

import type { CompressorSettings } from "./compressor.types";

const AUTO_MIME_TYPE = "auto";

const BYTES_PER_KB = 1024;
const BYTES_PER_MB = BYTES_PER_KB * 1024;
const BYTES_PER_GB = BYTES_PER_MB * 1024;
const TWO_DECIMALS = 2;

/**
 * Promise-based wrapper around the imperative compressorjs constructor.
 */
export const compressImage = (file: File | Blob, options: Compressor.Options = {}): Promise<File | Blob> =>
  new Promise((resolve, reject) => {
    new Compressor(file, {
      ...options,
      success: (result) => resolve(result),
      error: (error) => reject(error),
    });
  });

/**
 * Human-readable byte count using binary (1024) units with two decimals.
 * Example: formatFileSize(1024) === "1.00 KB".
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes >= BYTES_PER_GB) return `${(bytes / BYTES_PER_GB).toFixed(TWO_DECIMALS)} GB`;
  if (bytes >= BYTES_PER_MB) return `${(bytes / BYTES_PER_MB).toFixed(TWO_DECIMALS)} MB`;
  if (bytes >= BYTES_PER_KB) return `${(bytes / BYTES_PER_KB).toFixed(TWO_DECIMALS)} KB`;
  return `${bytes} B`;
};

/**
 * Signed compression ratio as a percentage string.
 * Example: computeCompressionRatio(1000, 500) === "-50%".
 */
export const computeCompressionRatio = (originalBytes: number, compressedBytes: number): string => {
  if (originalBytes <= 0) return "0%";
  const ratio = ((compressedBytes - originalBytes) / originalBytes) * 100;
  return `${Math.round(ratio)}%`;
};

/**
 * Build an export filename from the source name and the target MIME type.
 * Example: buildExportFilename("photo.png", "image/webp") === "photo_compressed.webp".
 */
export const buildExportFilename = (originalName: string, mimeType: string): string => {
  const lastDot = originalName.lastIndexOf(".");
  const baseName = lastDot > 0 ? originalName.slice(0, lastDot) : originalName;
  const ext = mimeToExt(mimeType);
  return `${baseName}_compressed.${ext}`;
};

/**
 * Map persisted CompressorSettings to a runtime compressorjs Options object.
 * Drops sentinel values ("auto" mimeType, zero width/height bounds) so the
 * underlying library falls back to its own defaults rather than clamping to 0.
 */
export const buildCompressorOptions = (settings: CompressorSettings): Compressor.Options => {
  const options: Compressor.Options = {
    quality: settings.quality,
    maxWidth: settings.maxWidth,
    maxHeight: settings.maxHeight,
    resize: settings.resize,
    convertSize: settings.convertSize,
    checkOrientation: settings.checkOrientation,
  };

  if (settings.mimeType !== AUTO_MIME_TYPE) options.mimeType = settings.mimeType;
  if (settings.minWidth > 0) options.minWidth = settings.minWidth;
  if (settings.minHeight > 0) options.minHeight = settings.minHeight;
  if (settings.width > 0) options.width = settings.width;
  if (settings.height > 0) options.height = settings.height;

  return options;
};

/**
 * Type guard accepting any browser File whose MIME type denotes an image.
 */
export const isImageFile = (file: File): boolean => file.type.startsWith("image/");

interface ClipboardLikeItem {
  kind: string;
  type: string;
  getAsFile: () => File | null;
}

/**
 * Extract the first image File from a clipboard DataTransferItemList.
 * Returns null when no image item is present or getAsFile() returns null.
 */
export const extractImageFromClipboardItems = (items: ReadonlyArray<ClipboardLikeItem>): File | null => {
  for (const item of items) {
    if (!item.type.startsWith("image/")) continue;

    const file = item.getAsFile();
    if (file) return file;
  }

  return null;
};
