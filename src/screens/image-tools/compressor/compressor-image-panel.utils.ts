import { isBlank, isNullish } from "@lichens-innovation/ts-common";

import { formatBytesPretty } from "~/utils/number-format.utils";

const MISSING_VALUE_PLACEHOLDER = "—";

export interface PanelStat {
  label: string;
  value: string;
}

export interface PanelStatsInput {
  sizeBytes: number | null;
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
    isNullish(input.width) || isNullish(input.height) ? MISSING_VALUE_PLACEHOLDER : `${input.width} × ${input.height}`;

  const size = isNullish(input.sizeBytes) ? MISSING_VALUE_PLACEHOLDER : formatBytesPretty(input.sizeBytes);

  const stats: PanelStat[] = [
    { label: "Size", value: size },
    { label: "Dimensions", value: dimensions },
    { label: "Type", value: isBlank(input.mimeType) ? MISSING_VALUE_PLACEHOLDER : input.mimeType },
  ];

  if (!isNullish(input.compressionRatio)) {
    stats.push({ label: "Ratio", value: input.compressionRatio });
  }

  return stats;
};
