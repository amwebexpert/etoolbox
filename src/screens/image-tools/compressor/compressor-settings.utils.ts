import type { CompressorResizeMode } from "./compressor.types";

const PERCENT_SCALE = 100;

/**
 * Convert a compressorjs quality value (0–1) to a 0–100 percentage.
 */
export const qualityToPercent = (quality: number): number => Math.round(quality * PERCENT_SCALE);

/**
 * Convert a 0–100 percentage to a compressorjs quality value (0–1).
 */
export const percentToQuality = (percent: number): number => percent / PERCENT_SCALE;

export interface MimeTypeOption {
  value: string;
  label: string;
}

/**
 * Compressorjs output mime-type choices presented in the settings form.
 * Includes "auto" (use input type) for parity with the store default.
 */
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

/**
 * Compressorjs resize strategy choices.
 */
export const RESIZE_OPTIONS: ReadonlyArray<ResizeOption> = [
  { value: "none", label: "None" },
  { value: "contain", label: "Contain" },
  { value: "cover", label: "Cover" },
];
