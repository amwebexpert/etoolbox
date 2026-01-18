import { getErrorMessage } from "@lichens-innovation/ts-common";
import {
  formatJson as formatJsonUtil,
  prettifyJson as prettifyJsonUtil,
  minifyJson as minifyJsonUtil,
  isMinifiedJson,
} from "~/utils/json.utils";

import {
  apiDocConfig,
  compactConfig,
  darkModeConfig,
  defaultConfig,
  developerConfig,
  lightModeConfig,
  minimalConfig,
  presentationConfig,
} from "./json-formatter.examples";
import type { ReactJsonViewConfig } from "./json-formatter.types";

export const PRESET_OPTIONS: Array<{
  label: string;
  value: string;
  config: ReactJsonViewConfig;
}> = [
  { label: "Default", value: "default", config: defaultConfig },
  { label: "Minimal", value: "minimal", config: minimalConfig },
  { label: "Developer", value: "developer", config: developerConfig },
  { label: "Presentation", value: "presentation", config: presentationConfig },
  { label: "Dark Mode", value: "dark", config: darkModeConfig },
  { label: "Light Mode", value: "light", config: lightModeConfig },
  { label: "Compact", value: "compact", config: compactConfig },
  { label: "API Documentation", value: "api-doc", config: apiDocConfig },
];

export const THEME_OPTIONS = [
  { label: "Rjv Default", value: "rjv-default" as const },
  { label: "Monokai", value: "monokai" as const },
  { label: "Google", value: "google" as const },
  { label: "Ocean", value: "ocean" as const },
  { label: "Paraiso", value: "paraiso" as const },
  { label: "Codeschool", value: "codeschool" as const },
  { label: "Ashes", value: "ashes" as const },
  { label: "Bespin", value: "bespin" as const },
  { label: "Brewer", value: "brewer" as const },
  { label: "Bright", value: "bright" as const },
  { label: "Chalk", value: "chalk" as const },
  { label: "Flat", value: "flat" as const },
  { label: "Grayscale", value: "grayscale" as const },
  { label: "Greenscreen", value: "greenscreen" as const },
  { label: "Harmonic", value: "harmonic" as const },
  { label: "Hopscotch", value: "hopscotch" as const },
  { label: "Isotope", value: "isotope" as const },
  { label: "Marrakesh", value: "marrakesh" as const },
  { label: "Pop", value: "pop" as const },
  { label: "Railscasts", value: "railscasts" as const },
  { label: "Shapeshifter", value: "shapeshifter" as const },
  { label: "Solarized", value: "solarized" as const },
  { label: "Summerfruit", value: "summerfruit" as const },
  { label: "Threezerotwofour", value: "threezerotwofour" as const },
  { label: "Tomorrow", value: "tomorrow" as const },
  { label: "Tube", value: "tube" as const },
  { label: "Twilight", value: "twilight" as const },
];

export const ICON_STYLE_OPTIONS = [
  { label: "Circle", value: "circle" },
  { label: "Triangle", value: "triangle" },
  { label: "Square", value: "square" },
];

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

export const parseJsonForView = (formattedJson: string): object | null => {
  try {
    return JSON.parse(formattedJson);
  } catch (e: unknown) {
    console.error("Failed to parse JSON", getErrorMessage(e));
    return null;
  }
};
