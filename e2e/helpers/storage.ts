import type { Page } from "@playwright/test";

export const clearPersistedStores = async (page: Page, keys: readonly string[]): Promise<void> => {
  await page.evaluate((k) => {
    k.forEach((key) => localStorage.removeItem(key));
  }, keys);
};

const JSON_STORE_KEYS = ["etoolbox-json-formatter", "etoolbox-json-converter", "etoolbox-json-repair"] as const;
export const clearJsonPersistedStores = (page: Page): Promise<void> => clearPersistedStores(page, JSON_STORE_KEYS);

const BASE64_STORE_KEYS = ["etoolbox-base64-string", "etoolbox-data-uri"] as const;
export const clearBase64PersistedStores = (page: Page): Promise<void> => clearPersistedStores(page, BASE64_STORE_KEYS);

const URL_STORE_KEYS = ["etoolbox-url-curl", "etoolbox-url-parser", "etoolbox-url-encoder"] as const;
export const clearUrlPersistedStores = (page: Page): Promise<void> => clearPersistedStores(page, URL_STORE_KEYS);

const COLORS_STORE_KEYS = ["etoolbox-color-picker", "etoolbox-named-colors"] as const;
export const clearColorsPersistedStores = (page: Page): Promise<void> => clearPersistedStores(page, COLORS_STORE_KEYS);

const QRCODE_STORE_KEYS = ["etoolbox-qrcode-generator"] as const;
export const clearQrcodePersistedStores = (page: Page): Promise<void> => clearPersistedStores(page, QRCODE_STORE_KEYS);

const IMAGE_OCR_STORE_KEYS = ["etoolbox-image-ocr", "etoolbox-compressor"] as const;
export const clearImageOcrPersistedStores = (page: Page): Promise<void> =>
  clearPersistedStores(page, IMAGE_OCR_STORE_KEYS);

const COMMON_LISTS_STORE_KEYS = [
  "etoolbox-mime-types",
  "etoolbox-html-entities",
  "etoolbox-http-status-codes",
  "etoolbox-http-headers",
] as const;
export const clearCommonListsPersistedStores = (page: Page): Promise<void> =>
  clearPersistedStores(page, COMMON_LISTS_STORE_KEYS);

const REGEX_TESTER_STORE_KEYS = ["etoolbox-regex-tester"] as const;
export const clearRegexTesterPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, REGEX_TESTER_STORE_KEYS);

const UUID_GENERATOR_STORE_KEYS = ["etoolbox-uuid-generator"] as const;
export const clearUuidGeneratorPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, UUID_GENERATOR_STORE_KEYS);

const JWT_DECODER_STORE_KEYS = ["etoolbox-jwt-decoder"] as const;
export const clearJwtDecoderPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, JWT_DECODER_STORE_KEYS);

const DATE_CONVERTER_STORE_KEYS = ["etoolbox-date-converter"] as const;
export const clearDateConverterPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, DATE_CONVERTER_STORE_KEYS);

const CSV_PARSER_STORE_KEYS = ["etoolbox-csv-parser"] as const;
export const clearCsvParserPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, CSV_PARSER_STORE_KEYS);

const DIFF_VIEWER_STORE_KEYS = ["etoolbox-diff-viewer"] as const;
export const clearDiffViewerPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, DIFF_VIEWER_STORE_KEYS);

const VR_3D_VIEWER_STORE_KEYS = ["etoolbox-vr-3d-viewer"] as const;
export const clearVr3dViewerPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, VR_3D_VIEWER_STORE_KEYS);

const GITHUB_USER_PROJECTS_STORE_KEYS = ["etoolbox-github-user-projects"] as const;
export const clearGithubUserProjectsPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, GITHUB_USER_PROJECTS_STORE_KEYS);

const CODING_STANDARDS_STORE_KEYS = ["etoolbox-coding-standards"] as const;
export const clearCodingStandardsPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, CODING_STANDARDS_STORE_KEYS);

const POKER_PLANNING_STORE_KEYS = ["etoolbox-poker-planning"] as const;
export const clearPokerPlanningPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, POKER_PLANNING_STORE_KEYS);

const MARKDOWN_COMPOSER_STORE_KEYS = ["etoolbox-markdown-composer"] as const;
export const clearMarkdownComposerPersistedStore = (page: Page): Promise<void> =>
  clearPersistedStores(page, MARKDOWN_COMPOSER_STORE_KEYS);
