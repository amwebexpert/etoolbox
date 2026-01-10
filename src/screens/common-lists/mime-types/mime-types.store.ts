import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { MimeTypeCategory } from "./mime-types.types";
import { DEFAULT_CATEGORY, DEFAULT_FILTER, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./mime-types.utils";

interface MimeTypesState {
  category: MimeTypeCategory;
  filter: string;
  page: number;
  pageSize: number;
  setCategory: (category: MimeTypeCategory) => void;
  setFilter: (filter: string) => void;
  handlePageChange: (page: number, pageSize: number) => void;
  hasFilters: () => boolean;
  resetFilters: () => void;
}

const stateCreator = (set: (partial: Partial<MimeTypesState>) => void, get: () => MimeTypesState): MimeTypesState => ({
  category: DEFAULT_CATEGORY,
  filter: DEFAULT_FILTER,
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
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
  hasFilters: () => get().category !== DEFAULT_CATEGORY || get().filter !== DEFAULT_FILTER,
  resetFilters: () =>
    set({
      category: DEFAULT_CATEGORY,
      filter: DEFAULT_FILTER,
      page: DEFAULT_PAGE,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-mime-types";

const persistedStateCreator = persist<MimeTypesState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useMimeTypesStore = create<MimeTypesState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
