import { isNullish } from "@lichens-innovation/ts-common";
import { mimeToExt } from "@lichens-innovation/ts-common/mime";
import Compressor from "compressorjs";

import type { CompressorSettings } from "./compressor.types";

const AUTO_MIME_TYPE = "auto";

const BYTES_PER_KB = 1024;
const BYTES_PER_MB = BYTES_PER_KB * 1024;
const BYTES_PER_GB = BYTES_PER_MB * 1024;
const TWO_DECIMALS = 2;

export interface CompressImageArgs {
  file: File | Blob;
  options: Compressor.Options;
}

export const compressImage = ({ file, options }: CompressImageArgs): Promise<File | Blob> =>
  new Promise((resolve, reject) => {
    new Compressor(file, {
      ...options,
      success: (result) => resolve(result),
      error: (error) => reject(error),
    });
  });

export const formatFileSize = (bytes: number): string => {
  if (bytes >= BYTES_PER_GB) return `${(bytes / BYTES_PER_GB).toFixed(TWO_DECIMALS)} GB`;
  if (bytes >= BYTES_PER_MB) return `${(bytes / BYTES_PER_MB).toFixed(TWO_DECIMALS)} MB`;
  if (bytes >= BYTES_PER_KB) return `${(bytes / BYTES_PER_KB).toFixed(TWO_DECIMALS)} KB`;
  return `${bytes} B`;
};

export interface ComputeCompressionRatioArgs {
  originalBytes: number;
  compressedBytes: number;
}

export const computeCompressionRatio = ({ originalBytes, compressedBytes }: ComputeCompressionRatioArgs): string => {
  if (originalBytes <= 0) return "0%";
  const ratio = ((compressedBytes - originalBytes) / originalBytes) * 100;
  return `${Math.round(ratio)}%`;
};

export interface BuildExportFilenameArgs {
  originalName: string;
  mimeType: string;
}

export const buildExportFilename = ({ originalName, mimeType }: BuildExportFilenameArgs): string => {
  const lastDot = originalName.lastIndexOf(".");
  const baseName = lastDot > 0 ? originalName.slice(0, lastDot) : originalName;
  const ext = mimeToExt(mimeType);
  return `${baseName}_compressed.${ext}`;
};

// Drops sentinel values ("auto" mimeType, zero width/height bounds) so the habit-hooks-disable non-essential-comment
// underlying library falls back to its own defaults rather than clamping to 0. habit-hooks-disable non-essential-comment
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

export const isImageFile = (file: File): boolean => file.type.startsWith("image/");

interface ClipboardLikeItem {
  kind: string;
  type: string;
  getAsFile: () => File | null;
}

export const extractImageFromClipboardItems = (items: ReadonlyArray<ClipboardLikeItem>): File | null => {
  for (const item of items) {
    if (!item.type.startsWith("image/")) continue;

    const file = item.getAsFile();
    if (file) return file;
  }

  return null;
};

interface CanEnableDownloadArgs {
  isCompressing: boolean;
  compressedBlob: Blob | null;
}

export const canEnableDownload = ({ isCompressing, compressedBlob }: CanEnableDownloadArgs): boolean =>
  !isCompressing && !isNullish(compressedBlob);

interface TriggerDownloadArgs {
  blob: Blob;
  filename: string;
}

// Revoke the object URL right after the click so the browser doesn't retain the blob in memory. habit-hooks-disable non-essential-comment
export const triggerDownload = ({ blob, filename }: TriggerDownloadArgs): void => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};
