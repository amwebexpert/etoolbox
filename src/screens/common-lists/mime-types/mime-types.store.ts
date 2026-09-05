import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { createPaginatedFilterState } from "~/utils/paginated-filter-store.utils";

import type { MimeTypeCategory } from "./mime-types.types";
import { DEFAULT_CATEGORY, DEFAULT_FILTER, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./mime-types.utils";

interface HandlePageChangeArgs {
  page: number;
  pageSize: number;
}

interface MimeTypesState {
  category: MimeTypeCategory;
  filter: string;
  page: number;
  pageSize: number;
  setCategory: (category: MimeTypeCategory) => void;
  setFilter: (filter: string) => void;
  handlePageChange: ({ page, pageSize }: HandlePageChangeArgs) => void;
  hasFilters: () => boolean;
  resetFilters: () => void;
}

const stateCreator = createPaginatedFilterState<MimeTypeCategory>({
  category: DEFAULT_CATEGORY,
  filter: DEFAULT_FILTER,
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
});

const PERSISTED_STORE_NAME = "etoolbox-mime-types";

const persistedStateCreator = persist<MimeTypesState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useMimeTypesStore = create<MimeTypesState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
