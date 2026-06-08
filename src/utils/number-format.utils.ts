import prettyBytes from "pretty-bytes";

const PRETTY_BYTES_TWO_DECIMALS = { minimumFractionDigits: 2, maximumFractionDigits: 2 } as const;

/**
 * Format a byte count for display (e.g. "1.25 MB").
 * @param bytes - Size in bytes
 * @returns Human-readable string with two decimal places
 */
export const formatBytesPretty = (bytes: number): string => prettyBytes(bytes, PRETTY_BYTES_TWO_DECIMALS);
