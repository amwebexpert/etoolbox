import { HTML_ENTITIES } from "./html-entities.constants";
import type { HtmlEntity, HtmlEntityCategory, HtmlEntityFilterField } from "./html-entities.types";

export const DEFAULT_CATEGORY: HtmlEntityCategory = "all";
export const DEFAULT_FILTER = "";
export const DEFAULT_FILTER_FIELD: HtmlEntityFilterField = "all";
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 25;

interface ApplyFilteringArgs {
  category: HtmlEntityCategory;
  filter: string;
  filterField: HtmlEntityFilterField;
}

export const applyFiltering = ({ category, filter, filterField }: ApplyFilteringArgs): HtmlEntity[] => {
  let results = HTML_ENTITIES.slice();

  // Filter by category
  if (category && category !== "all") {
    results = results.filter((entity) => entity.category === category);
  }

  // Filter by named-only
  if (filterField === "named-only") {
    results = results.filter((entity) => entity.entityName !== "");
  }

  // Filter by search term
  if (filter) {
    const filterLowercase = filter.toLowerCase();

    results = results.filter((entity) => {
      return (
        entity.character.toLowerCase().includes(filterLowercase) ||
        entity.entityName.toLowerCase().includes(filterLowercase) ||
        entity.entityNumber.toLowerCase().includes(filterLowercase) ||
        entity.description.toLowerCase().includes(filterLowercase)
      );
    });
  }

  return results;
};

export const formatEntityDisplay = (entity: HtmlEntity): string => {
  if (entity.entityName) {
    return entity.entityName;
  }
  return entity.entityNumber;
};

export const getEntityUniqueKey = (entity: HtmlEntity): string => {
  return entity.entityNumber;
};

export const extractCodePointFromEntityNumber = (entityNumber: string): number | null => {
  // Parse &#123; format
  const match = entityNumber.match(/&#(\d+);/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
};

export const formatCodePoint = (entityNumber: string): string => {
  const codePoint = extractCodePointFromEntityNumber(entityNumber);
  if (codePoint !== null) {
    return `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`;
  }
  return "—";
};
