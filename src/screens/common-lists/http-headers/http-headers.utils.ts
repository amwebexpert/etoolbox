import { CATEGORY_LABELS, HTTP_HEADERS } from "./http-headers.constants";
import type {
  HttpHeaderEntry,
  HttpHeaderCategoryFilter,
  HttpHeaderTypeFilter,
  HttpHeaderCategory,
} from "./http-headers.types";

export const CATEGORIES: HttpHeaderCategory[] = [
  "authentication",
  "caching",
  "conditionals",
  "connection",
  "content-negotiation",
  "controls",
  "cookies",
  "cors",
  "downloads",
  "message-body",
  "proxies",
  "redirects",
  "request-context",
  "response-context",
  "range-requests",
  "security",
  "transfer-coding",
  "websockets",
  "other",
];

export const CATEGORY_OPTIONS = [
  { value: "all" as const, label: "All categories" },
  ...CATEGORIES.map((category) => ({
    value: category,
    label: CATEGORY_LABELS[category] ?? category,
  })),
];

export const TYPE_OPTIONS = [
  { value: "all" as const, label: "All types" },
  { value: "request" as const, label: "Request" },
  { value: "response" as const, label: "Response" },
  { value: "both" as const, label: "Both" },
];

interface ApplyFilteringArgs {
  category: HttpHeaderCategoryFilter;
  type: HttpHeaderTypeFilter;
  filter: string;
}

export const applyFiltering = ({ category, type, filter }: ApplyFilteringArgs): HttpHeaderEntry[] => {
  let results = HTTP_HEADERS.slice();

  if (category && category !== "all") {
    results = results.filter((entry) => entry.category === category);
  }

  if (type && type !== "all") {
    results = results.filter((entry) => entry.type === type || entry.type === "both");
  }

  if (filter) {
    const filterLowercase = filter.toLowerCase();

    results = results.filter((entry) => {
      return (
        entry.name.toLowerCase().includes(filterLowercase) || entry.description.toLowerCase().includes(filterLowercase)
      );
    });
  }

  return results;
};

export const DEFAULT_CATEGORY: HttpHeaderCategoryFilter = "all";
export const DEFAULT_TYPE: HttpHeaderTypeFilter = "all";
export const DEFAULT_FILTER = "";
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 200;

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100, 200];
