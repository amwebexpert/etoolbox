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
  setCategory: (category: HttpHeaderCategoryFilter) => void;
  setType: (type: HttpHeaderTypeFilter) => void;
  setFilter: (filter: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  resetFilters: () => void;
}

const stateCreator = (set: (partial: Partial<HttpHeadersState>) => void): HttpHeadersState => ({
  category: DEFAULT_CATEGORY,
  type: DEFAULT_TYPE,
  filter: DEFAULT_FILTER,
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  setCategory: (category) => set({ category, page: DEFAULT_PAGE }),
  setType: (type) => set({ type, page: DEFAULT_PAGE }),
  setFilter: (filter) => set({ filter, page: DEFAULT_PAGE }),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: DEFAULT_PAGE }),
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
