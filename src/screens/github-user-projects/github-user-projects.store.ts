import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  DEFAULT_FILTER,
  DEFAULT_LANGUAGE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SHOW_ARCHIVED,
  DEFAULT_SHOW_FORKS,
  DEFAULT_SORT_FIELD,
  DEFAULT_SORT_ORDER,
  DEFAULT_USERNAME,
} from "./github-user-projects.constants";
import type { SortField, SortOrder } from "./github-user-projects.types";

interface HandlePageChangeArgs {
  page: number;
  pageSize: number;
}

interface SearchSlice {
  username: string;
  lastSearchedUsername: string;
  setUsername: (username: string) => void;
  setLastSearchedUsername: (username: string) => void;
}

interface FiltersSlice {
  filter: string;
  language: string;
  showForks: boolean;
  showArchived: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
  setFilter: (filter: string) => void;
  setLanguage: (language: string) => void;
  setShowForks: (showForks: boolean) => void;
  setShowArchived: (showArchived: boolean) => void;
  setSortField: (sortField: SortField) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  toggleSortOrder: () => void;
  resetFilters: () => void;
}

interface PaginationSlice {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  handlePageChange: ({ page, pageSize }: HandlePageChangeArgs) => void;
}

interface GithubUserProjectsState extends SearchSlice, FiltersSlice, PaginationSlice {
  resetAll: () => void;
}

type SetGithubUserProjectsState = Parameters<StateCreator<GithubUserProjectsState>>[0];
type GetGithubUserProjectsState = Parameters<StateCreator<GithubUserProjectsState>>[1];

interface GithubUserProjectsSliceArgs {
  set: SetGithubUserProjectsState;
  get: GetGithubUserProjectsState;
}

const DEFAULT_SEARCH_STATE = {
  username: DEFAULT_USERNAME,
  lastSearchedUsername: DEFAULT_USERNAME,
};

const DEFAULT_FILTERS_STATE = {
  filter: DEFAULT_FILTER,
  language: DEFAULT_LANGUAGE,
  showForks: DEFAULT_SHOW_FORKS,
  showArchived: DEFAULT_SHOW_ARCHIVED,
  sortField: DEFAULT_SORT_FIELD,
  sortOrder: DEFAULT_SORT_ORDER,
};

const DEFAULT_PAGINATION_STATE = {
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
};

const createSearchSlice = ({ set }: GithubUserProjectsSliceArgs): SearchSlice => ({
  ...DEFAULT_SEARCH_STATE,

  setUsername: (username) => set({ username }),
  setLastSearchedUsername: (lastSearchedUsername) => set({ lastSearchedUsername, username: lastSearchedUsername }),
});

const createFiltersSlice = ({ set }: GithubUserProjectsSliceArgs): FiltersSlice => ({
  ...DEFAULT_FILTERS_STATE,

  setFilter: (filter) => set({ filter, page: DEFAULT_PAGE }),
  setLanguage: (language) => set({ language, page: DEFAULT_PAGE }),
  setShowForks: (showForks) => set({ showForks, page: DEFAULT_PAGE }),
  setShowArchived: (showArchived) => set({ showArchived, page: DEFAULT_PAGE }),
  setSortField: (sortField) => set({ sortField, page: DEFAULT_PAGE }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  toggleSortOrder: () =>
    set((state) => ({
      sortOrder: state.sortOrder === "asc" ? "desc" : "asc",
    })),
  resetFilters: () => set({ ...DEFAULT_FILTERS_STATE, page: DEFAULT_PAGE }),
});

const createPaginationSlice = ({ set, get }: GithubUserProjectsSliceArgs): PaginationSlice => ({
  ...DEFAULT_PAGINATION_STATE,

  setPage: (page) => set({ page }),
  handlePageChange: ({ page, pageSize }) => {
    const currentPageSize = get().pageSize;
    if (pageSize !== currentPageSize) {
      set({ page: DEFAULT_PAGE, pageSize });
    } else {
      set({ page });
    }
  },
});

const stateCreator: StateCreator<GithubUserProjectsState> = (set, get) => ({
  ...createSearchSlice({ set, get }),
  ...createFiltersSlice({ set, get }),
  ...createPaginationSlice({ set, get }),

  resetAll: () => set({ ...DEFAULT_SEARCH_STATE, ...DEFAULT_FILTERS_STATE, ...DEFAULT_PAGINATION_STATE }),
});

const PERSISTED_STORE_NAME = "etoolbox-github-user-projects";

const persistedStateCreator = persist<GithubUserProjectsState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useGithubUserProjectsStore = createDevToolsStore(PERSISTED_STORE_NAME, () =>
  create<GithubUserProjectsState>()(persistedStateCreator)
);
