export type ThemeKeys =
  | "apathy"
  | "apathy:inverted"
  | "ashes"
  | "bespin"
  | "brewer"
  | "bright:inverted"
  | "bright"
  | "chalk"
  | "codeschool"
  | "colors"
  | "eighties"
  | "embers"
  | "flat"
  | "google"
  | "grayscale"
  | "grayscale:inverted"
  | "greenscreen"
  | "harmonic"
  | "hopscotch"
  | "isotope"
  | "marrakesh"
  | "mocha"
  | "monokai"
  | "ocean"
  | "paraiso"
  | "pop"
  | "railscasts"
  | "rjv-default"
  | "shapeshifter"
  | "shapeshifter:inverted"
  | "solarized"
  | "summerfruit"
  | "summerfruit:inverted"
  | "threezerotwofour"
  | "tomorrow"
  | "tube"
  | "twilight";

export interface ReactJsonViewConfig {
  theme: ThemeKeys;
  iconStyle: "circle" | "triangle" | "square";
  indentWidth: number;
  collapsed: number | boolean;
  displayDataTypes: boolean;
  displayObjectSize: boolean;
  enableClipboard: boolean;
  quotesOnKeys: boolean;
  collapseStringsAfterLength: number;
  groupArraysAfterLength: number;
  sortKeys: boolean;
}

export const DEFAULT_REACT_JSON_VIEW_CONFIG: ReactJsonViewConfig = {
  theme: "monokai",
  iconStyle: "triangle",
  indentWidth: 4,
  collapsed: 1,
  displayDataTypes: true,
  displayObjectSize: true,
  enableClipboard: true,
  quotesOnKeys: true,
  collapseStringsAfterLength: 0,
  groupArraysAfterLength: 100,
  sortKeys: false,
};

export type ViewMode = "syntax-highlight" | "react-json-view";
