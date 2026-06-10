import { formatFileSize } from "./compressor.utils";

const MISSING_VALUE_PLACEHOLDER = "—";

export interface PanelStat {
  label: string;
  value: string;
}

export interface PanelStatsInput {
  sizeBytes: number;
  width: number | null;
  height: number | null;
  mimeType: string;
  compressionRatio?: string;
}

/**
 * Build the label/value rows shown beneath an image preview panel.
 * Includes Size, Dimensions, and Type for every panel; appends a Ratio
 * row only when a compressionRatio is provided (compressed panel).
 */
export const buildPanelStats = (input: PanelStatsInput): PanelStat[] => {
  const dimensions =
    input.width !== null && input.height !== null
      ? `${input.width} × ${input.height}`
      : MISSING_VALUE_PLACEHOLDER;

  const stats: PanelStat[] = [
    { label: "Size", value: formatFileSize(input.sizeBytes) },
    { label: "Dimensions", value: dimensions },
    { label: "Type", value: input.mimeType === "" ? MISSING_VALUE_PLACEHOLDER : input.mimeType },
  ];

  if (input.compressionRatio !== undefined) {
    stats.push({ label: "Ratio", value: input.compressionRatio });
  }

  return stats;
};
