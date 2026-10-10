import { isBlank } from "@lichens-innovation/ts-common";
import Papa, { type ParseConfig, type ParseResult } from "papaparse";
import prettyBytes from "pretty-bytes";

import {
  type CsvParseResult,
  type CsvParserOptions,
  DEFAULT_CSV_OPTIONS,
  type FileInfo,
  type ParseCsvArgs,
} from "./csv-parser.types";

// Convert our simplified options to PapaParse config habit-hooks-disable non-essential-comment
const toPapaConfig = (options: Partial<CsvParserOptions>): ParseConfig => {
  const mergedOptions: CsvParserOptions = {
    ...DEFAULT_CSV_OPTIONS,
    ...options,
  };

  return {
    delimiter: mergedOptions.delimiter, // empty string means auto-detect
    quoteChar: mergedOptions.quoteChar,
    escapeChar: mergedOptions.escapeChar,
    header: mergedOptions.header,
    dynamicTyping: mergedOptions.dynamicTyping,
    skipEmptyLines: mergedOptions.skipEmptyLines,
    comments: mergedOptions.comments ? "#" : false,
    transformHeader: (header: string) => header?.trim(),
  };
};

const toCsvParseResult = (result: ParseResult<unknown>): CsvParseResult => ({
  data: result.data as unknown[],
  meta: result.meta,
  errors: result.errors.map((err) => ({
    type: err.type,
    code: err.code,
    message: err.message,
    row: err.row,
  })),
});

// @see https://www.papaparse.com/docs#config habit-hooks-disable non-essential-comment
export const parseCsv = ({ csvData, options = {} }: ParseCsvArgs): Promise<CsvParseResult> => {
  return new Promise((resolve, reject) => {
    try {
      const result: ParseResult<unknown> = Papa.parse(csvData, toPapaConfig(options));
      resolve(toCsvParseResult(result));
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
};

interface ParseResultToast {
  level: "success" | "warning";
  content: string;
}

export const getParseResultToast = (result: CsvParseResult): ParseResultToast => {
  const errorCount = result.errors.length;
  if (errorCount > 0) {
    return { level: "warning", content: `Parsed with ${errorCount} warning(s)` };
  }

  return { level: "success", content: `Parsed ${result.data.length} rows successfully!` };
};

export const formatFileInfo = (fileInfo: FileInfo | null): string => {
  if (!fileInfo) return "";
  return `${fileInfo.name} (${prettyBytes(fileInfo.size)})`;
};

interface ReadFileAsTextWithEncodingArgs {
  file: File;
  encoding: string;
}

export const readFileAsTextWithEncoding = ({ file, encoding }: ReadFileAsTextWithEncodingArgs): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to read file as text"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file, encoding);
  });
};

interface CsvStats {
  rowCount: number;
  columnCount: number;
  columnNames: string[];
  errorCount: number;
  delimiter: string;
  lineBreak: string;
}

export const getCsvStats = (result: CsvParseResult | null): CsvStats | null => {
  if (!result) return null;

  const columnNames = result.meta.fields ?? [];

  return {
    rowCount: result.data.length,
    columnCount: columnNames.length,
    columnNames,
    errorCount: result.errors.length,
    delimiter: result.meta.delimiter ?? "unknown",
    lineBreak: result.meta.linebreak ?? "unknown",
  };
};

export const formatLineBreak = (linebreak?: string): string => {
  if (linebreak === "\r\n") return "CRLF (Windows)";
  if (linebreak === "\n") return "LF (Unix/Mac)";
  if (linebreak === "\r") return "CR (Old Mac)";
  if (isBlank(linebreak)) return "Unknown";

  return linebreak;
};
