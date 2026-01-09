import {
  formatJson as formatJsonUtil,
  prettifyJson as prettifyJsonUtil,
  minifyJson as minifyJsonUtil,
  isMinifiedJson,
} from "~/utils/json.utils";

interface FormatJsonArgs {
  value?: string;
  space: number;
}

export const formatJson = ({ value, space }: FormatJsonArgs): string => {
  return formatJsonUtil({ value, space, sortKeys: true });
};

interface PrettifyJsonArgs {
  value?: string;
}

export const prettifyJson = ({ value }: PrettifyJsonArgs): string => {
  return prettifyJsonUtil(value);
};

interface MinifyJsonArgs {
  value?: string;
}

export const minifyJson = ({ value }: MinifyJsonArgs): string => {
  return minifyJsonUtil(value);
};

interface IsMinifiedArgs {
  value: string;
}

export const isMinified = ({ value }: IsMinifiedArgs): boolean => {
  return isMinifiedJson(value);
};

interface GetFormattedJsonArgs {
  inputText?: string;
  isMinifiedMode: boolean;
}

export const getFormattedJson = ({ inputText, isMinifiedMode }: GetFormattedJsonArgs): string => {
  if (!inputText) return "";
  if (isMinifiedMode) return minifyJson({ value: inputText });
  return prettifyJson({ value: inputText });
};
