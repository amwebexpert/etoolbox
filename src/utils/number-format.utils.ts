import prettyBytes from "pretty-bytes";

const PRETTY_BYTES_TWO_DECIMALS = { minimumFractionDigits: 2, maximumFractionDigits: 2 } as const;

export const formatBytesPretty = (bytes: number): string => prettyBytes(bytes, PRETTY_BYTES_TWO_DECIMALS);
