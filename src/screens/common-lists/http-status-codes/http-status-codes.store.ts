import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createPaginatedFilterState } from "~/utils/paginated-filter-store.utils";

import type { HttpStatusCategoryFilter } from "./http-status-codes.types";
import { DEFAULT_CATEGORY, DEFAULT_FILTER, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./http-status-codes.utils";

interface HandlePageChangeArgs {
  page: number;
  pageSize: number;
}

interface HttpStatusCodesState {
  category: HttpStatusCategoryFilter;
  filter: string;
  page: number;
  pageSize: number;
  hasFilters: () => boolean;
  setCategory: (category: HttpStatusCategoryFilter) => void;
  setFilter: (filter: string) => void;
  handlePageChange: ({ page, pageSize }: HandlePageChangeArgs) => void;
  resetFilters: () => void;
}

const stateCreator = createPaginatedFilterState<HttpStatusCategoryFilter>({
  category: DEFAULT_CATEGORY,
  filter: DEFAULT_FILTER,
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
});

const PERSISTED_STORE_NAME = "etoolbox-http-status-codes";

const persistedStateCreator = persist<HttpStatusCodesState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useHttpStatusCodesStore = createDevToolsStore(PERSISTED_STORE_NAME, () =>
  create<HttpStatusCodesState>()(persistedStateCreator)
);
