import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

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

interface GithubUserProjectsState {
  // Search state
  username: string;
  lastSearchedUsername: string;

  // Filter state
  filter: string;
  language: string;
  showForks: boolean;
  showArchived: boolean;

  // Sort state
  sortField: SortField;
  sortOrder: SortOrder;

  // Pagination state
  page: number;
  pageSize: number;

  // Actions
  setUsername: (username: string) => void;
  setLastSearchedUsername: (username: string) => void;
  setFilter: (filter: string) => void;
  setLanguage: (language: string) => void;
  setShowForks: (showForks: boolean) => void;
  setShowArchived: (showArchived: boolean) => void;
  setSortField: (sortField: SortField) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  toggleSortOrder: () => void;
  setPage: (page: number) => void;
  handlePageChange: (page: number, pageSize: number) => void;
  resetFilters: () => void;
  resetAll: () => void;
}

const stateCreator: StateCreator<GithubUserProjectsState> = (set, get) => ({
  // Initial state
  username: DEFAULT_USERNAME,
  lastSearchedUsername: DEFAULT_USERNAME,
  filter: DEFAULT_FILTER,
  language: DEFAULT_LANGUAGE,
  showForks: DEFAULT_SHOW_FORKS,
  showArchived: DEFAULT_SHOW_ARCHIVED,
  sortField: DEFAULT_SORT_FIELD,
  sortOrder: DEFAULT_SORT_ORDER,
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,

  // Actions
  setUsername: (username) => set({ username }),
  setLastSearchedUsername: (lastSearchedUsername) => set({ lastSearchedUsername, username: lastSearchedUsername }),
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
  setPage: (page) => set({ page }),
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
      filter: DEFAULT_FILTER,
      language: DEFAULT_LANGUAGE,
      showForks: DEFAULT_SHOW_FORKS,
      showArchived: DEFAULT_SHOW_ARCHIVED,
      sortField: DEFAULT_SORT_FIELD,
      sortOrder: DEFAULT_SORT_ORDER,
      page: DEFAULT_PAGE,
    }),
  resetAll: () =>
    set({
      username: DEFAULT_USERNAME,
      lastSearchedUsername: DEFAULT_USERNAME,
      filter: DEFAULT_FILTER,
      language: DEFAULT_LANGUAGE,
      showForks: DEFAULT_SHOW_FORKS,
      showArchived: DEFAULT_SHOW_ARCHIVED,
      sortField: DEFAULT_SORT_FIELD,
      sortOrder: DEFAULT_SORT_ORDER,
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-github-user-projects";

const persistedStateCreator = persist<GithubUserProjectsState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useGithubUserProjectsStore = create<GithubUserProjectsState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
