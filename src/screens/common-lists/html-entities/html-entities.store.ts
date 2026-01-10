import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { HtmlEntityCategory, HtmlEntityFilterField } from "./html-entities.types";
import {
  DEFAULT_CATEGORY,
  DEFAULT_FILTER,
  DEFAULT_FILTER_FIELD,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "./html-entities.utils";

interface HtmlEntitiesState {
  category: HtmlEntityCategory;
  filter: string;
  filterField: HtmlEntityFilterField;
  page: number;
  pageSize: number;
  setCategory: (category: HtmlEntityCategory) => void;
  setFilter: (filter: string) => void;
  setFilterField: (filterField: HtmlEntityFilterField) => void;
  handlePageChange: (page: number, pageSize: number) => void;
  hasFilters: () => boolean;
  resetFilters: () => void;
}

const stateCreator = (
  set: (partial: Partial<HtmlEntitiesState>) => void,
  get: () => HtmlEntitiesState
): HtmlEntitiesState => ({
  category: DEFAULT_CATEGORY,
  filter: DEFAULT_FILTER,
  filterField: DEFAULT_FILTER_FIELD,
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  setCategory: (category) => set({ category, page: DEFAULT_PAGE }),
  setFilter: (filter) => set({ filter, page: DEFAULT_PAGE }),
  setFilterField: (filterField) => set({ filterField, page: DEFAULT_PAGE }),
  handlePageChange: (page, pageSize) => {
    const currentPageSize = get().pageSize;
    if (pageSize !== currentPageSize) {
      set({ page: DEFAULT_PAGE, pageSize });
    } else {
      set({ page });
    }
  },
  hasFilters: () =>
    get().category !== DEFAULT_CATEGORY ||
    get().filter !== DEFAULT_FILTER ||
    get().filterField !== DEFAULT_FILTER_FIELD,
  resetFilters: () =>
    set({
      category: DEFAULT_CATEGORY,
      filter: DEFAULT_FILTER,
      filterField: DEFAULT_FILTER_FIELD,
      page: DEFAULT_PAGE,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-html-entities";

const persistedStateCreator = persist<HtmlEntitiesState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useHtmlEntitiesStore = create<HtmlEntitiesState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
