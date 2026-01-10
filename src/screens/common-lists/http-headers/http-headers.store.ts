import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { HttpHeaderCategoryFilter, HttpHeaderTypeFilter } from "./http-headers.types";
import { DEFAULT_CATEGORY, DEFAULT_FILTER, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_TYPE } from "./http-headers.utils";

interface HttpHeadersState {
  category: HttpHeaderCategoryFilter;
  type: HttpHeaderTypeFilter;
  filter: string;
  page: number;
  pageSize: number;
  hasFilters: () => boolean;
  setCategory: (category: HttpHeaderCategoryFilter) => void;
  setType: (type: HttpHeaderTypeFilter) => void;
  setFilter: (filter: string) => void;
  handlePageChange: (page: number, pageSize: number) => void;
  resetFilters: () => void;
}

const stateCreator = (
  set: (partial: Partial<HttpHeadersState>) => void,
  get: () => HttpHeadersState
): HttpHeadersState => ({
  category: DEFAULT_CATEGORY,
  type: DEFAULT_TYPE,
  filter: DEFAULT_FILTER,
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  hasFilters: () =>
    get().category !== DEFAULT_CATEGORY || get().type !== DEFAULT_TYPE || get().filter !== DEFAULT_FILTER,
  setCategory: (category) => set({ category, page: DEFAULT_PAGE }),
  setType: (type) => set({ type, page: DEFAULT_PAGE }),
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
      type: DEFAULT_TYPE,
      filter: DEFAULT_FILTER,
      page: DEFAULT_PAGE,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-http-headers";

const persistedStateCreator = persist<HttpHeadersState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useHttpHeadersStore = create<HttpHeadersState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
