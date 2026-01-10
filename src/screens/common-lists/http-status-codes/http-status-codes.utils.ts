import { CATEGORY_LABELS, HTTP_STATUS_CODES } from "./http-status-codes.constants";
import type { HttpStatusCodeEntry, HttpStatusCategoryFilter } from "./http-status-codes.types";

export const CATEGORIES: HttpStatusCategoryFilter[] = ["1xx", "2xx", "3xx", "4xx", "5xx"];

export const CATEGORY_OPTIONS = [
  { value: "all" as const, label: "All categories" },
  ...CATEGORIES.map((category) => ({
    value: category,
    label: CATEGORY_LABELS[category] ?? category,
  })),
];

interface ApplyFilteringArgs {
  category: HttpStatusCategoryFilter;
  filter: string;
}

export const applyFiltering = ({ category, filter }: ApplyFilteringArgs): HttpStatusCodeEntry[] => {
  let results = HTTP_STATUS_CODES.slice();

  if (category && category !== "all") {
    results = results.filter((entry) => entry.category === category);
  }

  if (filter) {
    const filterLowercase = filter.toLowerCase();

    results = results.filter((entry) => {
      return (
        entry.code.toString().includes(filterLowercase) ||
        entry.name.toLowerCase().includes(filterLowercase) ||
        entry.description.toLowerCase().includes(filterLowercase)
      );
    });
  }

  return results;
};

export const DEFAULT_CATEGORY: HttpStatusCategoryFilter = "all";
export const DEFAULT_FILTER = "";
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 200;

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100, 200];
