import Papa, { type ParseConfig, type ParseResult } from "papaparse";
import prettyBytes from "pretty-bytes";

import { safeJsonStringify } from "~/utils/json.utils";

import type { CsvParseResult, CsvParserOptions, FileInfo, ParseCsvArgs } from "./csv-parser.types";
import { DEFAULT_CSV_OPTIONS } from "./csv-parser.types";

/**
 * Parse CSV data using PapaParse
 * @see https://www.papaparse.com/docs#config
 */
export const parseCsv = ({ csvData, options = {} }: ParseCsvArgs): Promise<CsvParseResult> => {
  return new Promise((resolve, reject) => {
    try {
      const mergedOptions: CsvParserOptions = {
        ...DEFAULT_CSV_OPTIONS,
        ...options,
      };

      // Convert our simplified options to PapaParse config
      const papaConfig: ParseConfig = {
        delimiter: mergedOptions.delimiter || undefined, // empty string means auto-detect
        quoteChar: mergedOptions.quoteChar,
        escapeChar: mergedOptions.escapeChar,
        header: mergedOptions.header,
        dynamicTyping: mergedOptions.dynamicTyping,
        skipEmptyLines: mergedOptions.skipEmptyLines,
        comments: mergedOptions.comments ? "#" : false,
        transformHeader: (header: string) => header?.trim(),
      };

      const result: ParseResult<unknown> = Papa.parse(csvData, papaConfig);

      resolve({
        data: result.data as unknown[],
        meta: result.meta,
        errors: result.errors.map((err) => ({
          type: err.type,
          code: err.code,
          message: err.message,
          row: err.row,
        })),
      });
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
};

/**
 * Format file info for display
 */
export const formatFileInfo = (fileInfo: FileInfo | null): string => {
  if (!fileInfo) return "";
  return `${fileInfo.name} (${prettyBytes(fileInfo.size)})`;
};

/**
 * Read a file as text with specified encoding
 */
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

/**
 * Get statistics from parsed CSV data
 */
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

/**
 * Export CSV data to different formats
 */
export const convertToFormat = (data: unknown[], format: "json" | "csv"): string => {
  if (format === "json") {
    return safeJsonStringify(data);
  }

  // Convert back to CSV
  return Papa.unparse(data);
};

/**
 * Detect if a string might be CSV content
 */
export const looksLikeCsv = (text: string): boolean => {
  if (!text || text.trim().length === 0) return false;

  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return false;

  // Check for common delimiters
  const firstLine = lines[0];
  const delimiters = [",", ";", "\t", "|"];

  return delimiters.some((d) => {
    const count = (firstLine.match(new RegExp(d.replace(/[|]/g, "\\$&"), "g")) || []).length;
    return count >= 1;
  });
};

/**
 * Format line break for display
 */
export const formatLineBreak = (linebreak: string | undefined): string => {
  if (!linebreak) return "Unknown";
  if (linebreak === "\r\n") return "CRLF (Windows)";
  if (linebreak === "\n") return "LF (Unix/Mac)";
  if (linebreak === "\r") return "CR (Old Mac)";

  return linebreak;
};
