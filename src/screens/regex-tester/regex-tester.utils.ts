import { getErrorMessage, isBlank, isNullish } from "@lichens-innovation/ts-common";

import { escapeHtml } from "~/utils/html.utils";
import { safeJsonStringify } from "~/utils/json.utils";

export interface RegexTestResult {
  highlightedHtml: string;
  extractedValues: string;
  matchCount: number;
  uniqueCount: number;
  error: string | null;
}

export const DEFAULT_REGEX = "/([A-Z]+-\\d+)/g";
export const DEFAULT_INPUT_TEXT =
  "Since [AC-1940], the year Chuck Norris was born, roundhouse kick related deaths have increased 13,000 percent.";

export const REGEX_FLAG_OPTIONS = [
  { value: "g", label: "Global (g)", description: "Find all matches" },
  { value: "i", label: "Case Insensitive (i)", description: "Ignore case" },
  { value: "m", label: "Multiline (m)", description: "^ and $ match line boundaries" },
  { value: "s", label: "Dotall (s)", description: ". matches newlines" },
  { value: "u", label: "Unicode (u)", description: "Enable Unicode support" },
];

interface ParseRegexArgs {
  pattern: string;
  flags: string[];
}

export const parseRegex = ({ pattern, flags }: ParseRegexArgs): RegExp | null => {
  if (isBlank(pattern)) return null;

  try {
    const regexLiteralMatch = pattern.match(/^\/(.+)\/([gimsuy]*)$/);

    if (regexLiteralMatch) {
      const [, regexPattern, regexFlags] = regexLiteralMatch;
      const mergedFlags = [...new Set([...regexFlags, ...flags])].join("");
      return new RegExp(regexPattern, mergedFlags);
    }

    const flagsString = flags.join("");
    return new RegExp(pattern, flagsString);
  } catch {
    return null;
  }
};

interface TransformArgs {
  pattern: string;
  inputText: string;
  flags: string[];
}

const escapeAndBreak = (text: string): string => {
  return escapeHtml(text).replace(/\n/g, "<br />");
};

export const transformWithHighlights = ({ pattern, inputText, flags }: TransformArgs): string => {
  if (isBlank(pattern) || isBlank(inputText)) {
    return escapeAndBreak(inputText ?? "");
  }

  const regex = parseRegex({ pattern, flags });
  if (isNullish(regex)) {
    return escapeAndBreak(inputText);
  }

  try {
    const escapedText = escapeHtml(inputText);
    const textWithBreaks = escapedText.replace(/\n/g, "{{NEWLINE}}");

    const highlighted = regex.global
      ? textWithBreaks.replaceAll(regex, (match) => `<span class="regex-match">${match}</span>`)
      : textWithBreaks.replace(regex, (match) => `<span class="regex-match">${match}</span>`);

    return highlighted.replace(/\{\{NEWLINE\}\}/g, "<br />");
  } catch {
    return escapeAndBreak(inputText);
  }
};

export const extractMatches = ({ pattern, inputText, flags }: TransformArgs): string[] => {
  if (isBlank(pattern) || isBlank(inputText)) {
    return [];
  }

  const flagsWithGlobal = flags.includes("g") ? flags : [...flags, "g"];
  const regex = parseRegex({ pattern, flags: flagsWithGlobal });

  if (isNullish(regex)) {
    return [];
  }

  try {
    const matches: string[] = [];
    let result: RegExpExecArray | null;

    while ((result = regex.exec(inputText)) !== null) {
      matches.push(result[0]);
      if (result[0].length === 0) {
        regex.lastIndex++;
      }
    }

    return matches;
  } catch {
    return [];
  }
};

interface TestRegexArgs {
  pattern: string;
  inputText: string;
  flags: string[];
}

export const testRegex = ({ pattern, inputText, flags }: TestRegexArgs): RegexTestResult => {
  if (isBlank(pattern)) {
    return {
      highlightedHtml: escapeAndBreak(inputText ?? ""),
      extractedValues: "",
      matchCount: 0,
      uniqueCount: 0,
      error: null,
    };
  }

  try {
    const regex = parseRegex({ pattern, flags });

    if (isNullish(regex)) {
      return {
        highlightedHtml: escapeAndBreak(inputText ?? ""),
        extractedValues: "",
        matchCount: 0,
        uniqueCount: 0,
        error: "Invalid regular expression",
      };
    }

    const highlightedHtml = transformWithHighlights({ pattern, inputText, flags });
    const matches = extractMatches({ pattern, inputText, flags });
    const uniqueMatches = [...new Set(matches)];

    return {
      highlightedHtml,
      extractedValues: matches.join(", "),
      matchCount: matches.length,
      uniqueCount: uniqueMatches.length,
      error: null,
    };
  } catch (e: unknown) {
    return {
      highlightedHtml: escapeAndBreak(inputText ?? ""),
      extractedValues: "",
      matchCount: 0,
      uniqueCount: 0,
      error: getErrorMessage(e),
    };
  }
};

interface FormatExtractedValuesArgs {
  matches: string[];
  format: ExtractFormat;
}

export const formatExtractedValues = ({ matches, format }: FormatExtractedValuesArgs): string => {
  if (matches.length === 0) return "";

  switch (format) {
    case "comma":
      return matches.join(", ");
    case "jira":
      return `issueKey in (${matches.join(", ")})`;
    case "newline":
      return matches.join("\n");
    case "json":
      return safeJsonStringify(matches);
    default:
      return matches.join(", ");
  }
};

export const EXTRACT_FORMAT_OPTIONS = [
  { value: "comma", label: "Comma separated" },
  { value: "jira", label: "Jira filter (issueKey in)" },
  { value: "newline", label: "New lines" },
  { value: "json", label: "JSON array" },
];

export type ExtractFormat = "comma" | "jira" | "newline" | "json";
