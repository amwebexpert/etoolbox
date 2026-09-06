import type { CompressorResizeMode } from "./compressor.types";

const PERCENT_SCALE = 100;

export const qualityToPercent = (quality: number): number => Math.round(quality * PERCENT_SCALE);

export const percentToQuality = (percent: number): number => percent / PERCENT_SCALE;

export interface MimeTypeOption {
  value: string;
  label: string;
}

export const MIME_TYPE_OPTIONS: ReadonlyArray<MimeTypeOption> = [
  { value: "auto", label: "Auto (same as input)" },
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/webp", label: "WebP" },
  { value: "image/png", label: "PNG" },
];

export interface ResizeOption {
  value: CompressorResizeMode;
  label: string;
}

export const RESIZE_OPTIONS: ReadonlyArray<ResizeOption> = [
  { value: "none", label: "None" },
  { value: "contain", label: "Contain" },
  { value: "cover", label: "Cover" },
];
