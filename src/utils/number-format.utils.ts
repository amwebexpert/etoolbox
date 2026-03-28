import prettyBytes from "pretty-bytes";

const PRETTY_BYTES_TWO_DECIMALS = { minimumFractionDigits: 2, maximumFractionDigits: 2 } as const;

/**
 * Format a byte count for display (e.g. "1.25 MB").
 * @param bytes - Size in bytes
 * @returns Human-readable string with two decimal places
 */
export const formatBytesPretty = (bytes: number): string => prettyBytes(bytes, PRETTY_BYTES_TWO_DECIMALS);

/**
 * Format a number with K (thousands) or M (millions) suffix.
 * @param count - The number to format
 * @returns Formatted string with appropriate suffix
 */
export const formatCount = (count: number): string => {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
};

/**
 * Format a duration in milliseconds to a human-readable string.
 * @param ms - Duration in milliseconds
 * @returns Formatted string (e.g., "150ms" or "2.5s")
 */
export const formatDuration = (ms: number): string => {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  return `${(ms / 1000).toFixed(1)}s`;
};
