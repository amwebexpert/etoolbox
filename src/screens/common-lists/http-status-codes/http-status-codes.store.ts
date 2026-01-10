import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { HttpStatusCategoryFilter } from "./http-status-codes.types";
import { DEFAULT_CATEGORY, DEFAULT_FILTER, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./http-status-codes.utils";

interface HttpStatusCodesState {
  category: HttpStatusCategoryFilter;
  filter: string;
  page: number;
  pageSize: number;
  hasFilters: () => boolean;
  setCategory: (category: HttpStatusCategoryFilter) => void;
  setFilter: (filter: string) => void;
  handlePageChange: (page: number, pageSize: number) => void;
  resetFilters: () => void;
}

const stateCreator = (
  set: (partial: Partial<HttpStatusCodesState>) => void,
  get: () => HttpStatusCodesState
): HttpStatusCodesState => ({
  category: DEFAULT_CATEGORY,
  filter: DEFAULT_FILTER,
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  hasFilters: () => get().category !== DEFAULT_CATEGORY || get().filter !== DEFAULT_FILTER,
  setCategory: (category) => set({ category, page: DEFAULT_PAGE }),
  setFilter: (filter) => set({ filter, page: DEFAULT_PAGE }),
  handlePageChange: (page, pageSize) => {
    const currentPageSize = get().pageSize;
    if (pageSize !== currentPageSize) {
      set({ page: DEFAULT_PAGE, pageSize });
    } else {
      set({ page });
    }
  },
  resetFilters: () =>
    set({
      category: DEFAULT_CATEGORY,
      filter: DEFAULT_FILTER,
      page: DEFAULT_PAGE,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-http-status-codes";

const persistedStateCreator = persist<HttpStatusCodesState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useHttpStatusCodesStore = create<HttpStatusCodesState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
