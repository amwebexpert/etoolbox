/**
 * JSON Formatter - Configuration Examples
 *
 * This file contains example configurations for the ReactJson viewer.
 * Developers can use these as templates for common use cases.
 */

import type { ReactJsonViewConfig } from "./json-formatter.types";

/**
 * Default Configuration
 * Balanced settings for general use
 */
export const DEFAULT_CONFIG: ReactJsonViewConfig = {
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

/**
 * Minimal View Configuration
 * Clean, compact view with minimal visual clutter
 */
export const MINIMAL_CONFIG: ReactJsonViewConfig = {
  theme: "rjv-default",
  iconStyle: "circle",
  indentWidth: 2,
  collapsed: false,
  displayDataTypes: false,
  displayObjectSize: false,
  enableClipboard: true,
  quotesOnKeys: false,
  collapseStringsAfterLength: 100,
  groupArraysAfterLength: 100,
  sortKeys: false,
};

/**
 * Developer View Configuration
 * Shows all available information for debugging
 */
export const DEVELOPER_CONFIG: ReactJsonViewConfig = {
  theme: "monokai",
  iconStyle: "triangle",
  indentWidth: 4,
  collapsed: false,
  displayDataTypes: true,
  displayObjectSize: true,
  enableClipboard: true,
  quotesOnKeys: true,
  collapseStringsAfterLength: 0,
  groupArraysAfterLength: 100,
  sortKeys: true,
};

/**
 * Presentation Mode Configuration
 * Clean look for demos and presentations
 */
export const PRESENTATION_CONFIG: ReactJsonViewConfig = {
  theme: "bright",
  iconStyle: "square",
  indentWidth: 4,
  collapsed: 2,
  displayDataTypes: false,
  displayObjectSize: true,
  enableClipboard: false,
  quotesOnKeys: true,
  collapseStringsAfterLength: 50,
  groupArraysAfterLength: 100,
  sortKeys: true,
};

/**
 * Dark Mode Configuration
 * Optimized for dark theme environments
 */
export const DARK_MODE_CONFIG: ReactJsonViewConfig = {
  theme: "ocean",
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

/**
 * Light Mode Configuration
 * Optimized for light theme environments
 */
export const LIGHT_MODE_CONFIG: ReactJsonViewConfig = {
  theme: "google",
  iconStyle: "circle",
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

/**
 * Compact View Configuration
 * For large JSON files where space is at a premium
 */
export const COMPACT_CONFIG: ReactJsonViewConfig = {
  theme: "grayscale",
  iconStyle: "circle",
  indentWidth: 2,
  collapsed: 2,
  displayDataTypes: false,
  displayObjectSize: true,
  enableClipboard: true,
  quotesOnKeys: false,
  collapseStringsAfterLength: 30,
  groupArraysAfterLength: 50,
  sortKeys: false,
};

/**
 * API Documentation View
 * Ideal for viewing API responses
 */
export const API_DOC_CONFIG: ReactJsonViewConfig = {
  theme: "solarized",
  iconStyle: "triangle",
  indentWidth: 4,
  collapsed: 1,
  displayDataTypes: true,
  displayObjectSize: true,
  enableClipboard: true,
  quotesOnKeys: true,
  collapseStringsAfterLength: 0,
  groupArraysAfterLength: 100,
  sortKeys: true,
};

/**
 * How to use these configurations:
 *
 * import { useJsonFormatterStore } from './json-formatter.store';
 * import { DEVELOPER_CONFIG } from './json-formatter.examples';
 *
 * const { setReactJsonConfig } = useJsonFormatterStore();
 * setReactJsonConfig(DEVELOPER_CONFIG);
 */
