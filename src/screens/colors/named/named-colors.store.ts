import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { DEFAULT_FAMILY, DEFAULT_FILTER, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./named-colors.utils";

interface NamedColorsState {
  family: string;
  filter: string;
  page: number;
  pageSize: number;
  setFamily: (family: string) => void;
  setFilter: (filter: string) => void;
  handlePageChange: (page: number, pageSize: number) => void;
  hasFilters: () => boolean;
  resetFilters: () => void;
}

const stateCreator = (
  set: (partial: Partial<NamedColorsState>) => void,
  get: () => NamedColorsState
): NamedColorsState => ({
  family: DEFAULT_FAMILY,
  filter: DEFAULT_FILTER,
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  setFamily: (family) => set({ family, page: DEFAULT_PAGE }),
  setFilter: (filter) => set({ filter, page: DEFAULT_PAGE }),
  handlePageChange: (page, pageSize) => {
    const currentPageSize = get().pageSize;
    if (pageSize !== currentPageSize) {
      set({ page: DEFAULT_PAGE, pageSize });
    } else {
      set({ page });
    }
  },
  hasFilters: () => get().family !== DEFAULT_FAMILY || get().filter !== DEFAULT_FILTER,
  resetFilters: () =>
    set({
      family: DEFAULT_FAMILY,
      filter: DEFAULT_FILTER,
      page: DEFAULT_PAGE,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-named-colors";

const persistedStateCreator = persist<NamedColorsState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useNamedColorsStore = create<NamedColorsState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
