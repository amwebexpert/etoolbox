import type { ParseMeta } from "papaparse";

// Types
export interface CsvParseResult {
  data: unknown[];
  meta: ParseMeta;
  errors: CsvParseError[];
}

export interface CsvParseError {
  type: string;
  code: string;
  message: string;
  row?: number;
}

export interface FileEncoding {
  label: string;
  name: string;
}

// Simplified parser options for UI usage
export interface CsvParserOptions {
  delimiter: string;
  quoteChar: string;
  escapeChar: string;
  header: boolean;
  dynamicTyping: boolean;
  skipEmptyLines: boolean;
  comments: boolean;
}

export interface ParseCsvArgs {
  csvData: string;
  options?: Partial<CsvParserOptions>;
}

export interface FileInfo {
  name: string;
  size: number;
}

// Constants
export const DEFAULT_CSV_OPTIONS: CsvParserOptions = {
  delimiter: "", // auto-detect
  quoteChar: '"',
  escapeChar: '"',
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  comments: false,
};

export const PAPA_PARSE_OPTIONS_DOC_URL = "https://www.papaparse.com/docs#config";

// Common file encodings (sorted by label)
export const FILE_ENCODING_OPTIONS: FileEncoding[] = [
  { label: "UTF-8", name: "UTF-8" },
  { label: "ASCII", name: "windows-1252" },
  { label: "ISO-8859-1 (Latin-1)", name: "ISO-8859-1" },
  { label: "ISO-8859-2 (Latin-2)", name: "ISO-8859-2" },
  { label: "ISO-8859-15 (Latin-9)", name: "ISO-8859-15" },
  { label: "Windows-1250", name: "windows-1250" },
  { label: "Windows-1251 (Cyrillic)", name: "windows-1251" },
  { label: "Windows-1252 (Western)", name: "windows-1252" },
  { label: "Windows-1256 (Arabic)", name: "windows-1256" },
  { label: "Shift_JIS", name: "Shift_JIS" },
  { label: "EUC-JP", name: "EUC-JP" },
  { label: "EUC-KR", name: "EUC-KR" },
  { label: "GBK (Chinese Simplified)", name: "GBK" },
  { label: "Big5 (Chinese Traditional)", name: "Big5" },
  { label: "UTF-16LE", name: "UTF-16LE" },
  { label: "UTF-16BE", name: "UTF-16BE" },
];

export const DEFAULT_ENCODING = "UTF-8";

// Delimiter options for manual selection
export const DELIMITER_OPTIONS = [
  { value: "", label: "Auto-detect" },
  { value: ",", label: "Comma (,)" },
  { value: ";", label: "Semicolon (;)" },
  { value: "\t", label: "Tab" },
  { value: "|", label: "Pipe (|)" },
  { value: ":", label: "Colon (:)" },
];

// View modes
export type ViewMode = "json" | "table";
