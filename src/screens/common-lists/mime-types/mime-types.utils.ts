import mimeDb from "mime-db";

import type { MimeTypeCategory, MimeTypeEntry } from "./mime-types.types";

// Transform mime-db into our format with categories
const initMimeTypes = (): MimeTypeEntry[] => {
  const entries: MimeTypeEntry[] = [];

  for (const [mimeType, entry] of Object.entries(mimeDb)) {
    const category = extractCategory(mimeType);
    entries.push({
      mimeType,
      extensions: entry.extensions ?? [],
      category,
    });
  }

  return entries.sort((a, b) => a.mimeType.localeCompare(b.mimeType));
};

const extractCategory = (mimeType: string): string => {
  const slashIndex = mimeType.indexOf("/");
  if (slashIndex === -1) return "other";
  return mimeType.substring(0, slashIndex);
};

export const MIME_TYPES: MimeTypeEntry[] = initMimeTypes();

export const CATEGORIES: string[] = [...new Set(MIME_TYPES.map((entry) => entry.category))].sort();

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const CATEGORY_OPTIONS = [
  { value: "all" as const, label: "All categories" },
  ...CATEGORIES.map((category) => ({ value: category, label: capitalizeFirst(category) })),
];

export const formatExtensions = (extensions: readonly string[]): string => {
  if (extensions.length === 0) return "—";
  return extensions.map((ext) => `.${ext}`).join(", ");
};

interface ApplyFilteringArgs {
  category: MimeTypeCategory;
  filter: string;
}

export const applyFiltering = ({ category, filter }: ApplyFilteringArgs): MimeTypeEntry[] => {
  let results = MIME_TYPES.slice();

  if (category && category !== "all") {
    results = results.filter((entry) => entry.category === category);
  }

  if (filter) {
    const filterLowercase = filter.toLowerCase();

    results = results.filter((entry) => {
      const extensionsStr = formatExtensions(entry.extensions).toLowerCase();
      return (
        entry.mimeType.toLowerCase().includes(filterLowercase) ||
        extensionsStr.includes(filterLowercase) ||
        entry.category.toLowerCase().includes(filterLowercase)
      );
    });
  }

  return results;
};

export const DEFAULT_CATEGORY: MimeTypeCategory = "all";
export const DEFAULT_FILTER = "";
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100, 200];
