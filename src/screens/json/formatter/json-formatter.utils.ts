import { getErrorMessage } from "@lichens-innovation/ts-common";
import {
  formatJson as formatJsonUtil,
  prettifyJson as prettifyJsonUtil,
  minifyJson as minifyJsonUtil,
  isMinifiedJson,
} from "~/utils/json.utils";

import {
  API_DOC_CONFIG,
  COMPACT_CONFIG,
  DARK_MODE_CONFIG,
  DEFAULT_CONFIG,
  DEVELOPER_CONFIG,
  LIGHT_MODE_CONFIG,
  MINIMAL_CONFIG,
  PRESENTATION_CONFIG,
} from "./json-formatter.examples";
import type { ReactJsonViewConfig } from "./json-formatter.types";

export const PRESET_OPTIONS: Array<{
  label: string;
  value: string;
  config: ReactJsonViewConfig;
}> = [
  { label: "Default", value: "default", config: DEFAULT_CONFIG },
  { label: "Minimal", value: "minimal", config: MINIMAL_CONFIG },
  { label: "Developer", value: "developer", config: DEVELOPER_CONFIG },
  { label: "Presentation", value: "presentation", config: PRESENTATION_CONFIG },
  { label: "Dark Mode", value: "dark", config: DARK_MODE_CONFIG },
  { label: "Light Mode", value: "light", config: LIGHT_MODE_CONFIG },
  { label: "Compact", value: "compact", config: COMPACT_CONFIG },
  { label: "API Documentation", value: "api-doc", config: API_DOC_CONFIG },
];

export const THEME_OPTIONS = [
  { label: "Rjv Default", value: "rjv-default" },
  { label: "Monokai", value: "monokai" },
  { label: "Google", value: "google" },
  { label: "Ocean", value: "ocean" },
  { label: "Paraiso", value: "paraiso" },
  { label: "Codeschool", value: "codeschool" },
  { label: "Ashes", value: "ashes" },
  { label: "Bespin", value: "bespin" },
  { label: "Brewer", value: "brewer" },
  { label: "Bright", value: "bright" },
  { label: "Chalk", value: "chalk" },
  { label: "Flat", value: "flat" },
  { label: "Grayscale", value: "grayscale" },
  { label: "Greenscreen", value: "greenscreen" },
  { label: "Harmonic", value: "harmonic" },
  { label: "Hopscotch", value: "hopscotch" },
  { label: "Isotope", value: "isotope" },
  { label: "Marrakesh", value: "marrakesh" },
  { label: "Pop", value: "pop" },
  { label: "Railscasts", value: "railscasts" },
  { label: "Shapeshifter", value: "shapeshifter" },
  { label: "Solarized", value: "solarized" },
  { label: "Summerfruit", value: "summerfruit" },
  { label: "Threezerotwofour", value: "threezerotwofour" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "Tube", value: "tube" },
  { label: "Twilight", value: "twilight" },
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
