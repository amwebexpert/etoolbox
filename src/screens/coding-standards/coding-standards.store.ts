import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { EmbeddingsProgress, GuidelineSource, Rule } from "./coding-standards.types";

const DEFAULT_GUIDELINE_SOURCES: GuidelineSource[] = [
  {
    id: "react-patterns",
    name: "React Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-react-patterns.md",
    enabled: true,
  },
  {
    id: "typescript-patterns",
    name: "TypeScript Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-coding-patterns.md",
    enabled: true,
  },
  {
    id: "testing-patterns",
    name: "Testing Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-unit-testing.md",
    enabled: true,
  },
  {
    id: "naming-patterns",
    name: "Naming Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-naming-patterns.md",
    enabled: true,
  },
];

interface CodingStandardsState {
  // Search
  searchQuery: string;
  isSearching: boolean;
  searchResults: Rule[];

  // Guidelines sources
  guidelineSources: GuidelineSource[];

  // Embeddings
  embeddingsProgress: EmbeddingsProgress;
  isInitialized: boolean;
  isLoadingModel: boolean;
  modelLoadProgress: string;

  // Actions
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Rule[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  performSearch: () => Promise<void>;
  addGuidelineSource: (source: GuidelineSource) => void;
  updateGuidelineSource: (id: string, updates: Partial<GuidelineSource>) => void;
  removeGuidelineSource: (id: string) => void;
  setEmbeddingsProgress: (progress: EmbeddingsProgress) => void;
  setIsInitialized: (initialized: boolean) => void;
  setIsLoadingModel: (loading: boolean) => void;
  setModelLoadProgress: (progress: string) => void;
  initializeEmbeddings: () => Promise<void>;
}

const stateCreator = immer<CodingStandardsState>((set) => ({
  // Search
  searchQuery: "",
  isSearching: false,
  searchResults: [],

  // Guidelines sources
  guidelineSources: DEFAULT_GUIDELINE_SOURCES,

  // Embeddings
  embeddingsProgress: {
    isCompleted: false,
    total: 0,
    completed: 0,
    currentRule: "",
  },
  isInitialized: false,
  isLoadingModel: false,
  modelLoadProgress: "",

  // Actions
  setSearchQuery: (query) =>
    set((state) => {
      state.searchQuery = query;
    }),
  setSearchResults: (results) =>
    set((state) => {
      state.searchResults = results;
    }),
  setIsSearching: (isSearching) =>
    set((state) => {
      state.isSearching = isSearching;
    }),
  performSearch: async () => {
    // This will be implemented in the hook
  },
  addGuidelineSource: (source) =>
    set((state) => {
      state.guidelineSources.push(source);
    }),
  updateGuidelineSource: (id, updates) =>
    set((state) => {
      const index = state.guidelineSources.findIndex((s) => s.id === id);
      if (index >= 0) {
        Object.assign(state.guidelineSources[index], updates);
      }
    }),
  removeGuidelineSource: (id) =>
    set((state) => {
      state.guidelineSources = state.guidelineSources.filter((s) => s.id !== id);
    }),
  setEmbeddingsProgress: (progress) =>
    set((state) => {
      state.embeddingsProgress = progress;
    }),
  setIsInitialized: (initialized) =>
    set((state) => {
      state.isInitialized = initialized;
    }),
  setIsLoadingModel: (loading) =>
    set((state) => {
      state.isLoadingModel = loading;
    }),
  setModelLoadProgress: (progress) =>
    set((state) => {
      state.modelLoadProgress = progress;
    }),
  initializeEmbeddings: async () => {
    // This will be implemented in the hook
  },
}));

const PERSISTED_STORE_NAME = "etoolbox-coding-standards";

export const useCodingStandardsStore = create<CodingStandardsState>()(
  devtools(
    persist(stateCreator, {
      name: PERSISTED_STORE_NAME,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        searchQuery: state.searchQuery,
        guidelineSources: state.guidelineSources,
      }),
    }),
    { name: PERSISTED_STORE_NAME }
  )
);
