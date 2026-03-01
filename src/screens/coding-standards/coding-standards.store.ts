import { isNullish } from "@lichens-innovation/ts-common";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { EmbeddingsProgress, GuidelineNode, GuidelineSource, Rule } from "./coding-standards.types";
import { EmbeddingsEngine } from "./utils/embeddings-engine";
import { combineSearchResults, filterGuidelines } from "./utils/search.utils";

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
  embeddingsEngine: EmbeddingsEngine | null;
  embeddingsProgress: EmbeddingsProgress;
  isInitialized: boolean;
  isLoadingModel: boolean;
  modelLoadProgress: string;

  // Actions
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Rule[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  performSearch: (query: string, rootNode: GuidelineNode | null) => Promise<void>;
  addGuidelineSource: (source: GuidelineSource) => void;
  updateGuidelineSource: (id: string, updates: Partial<GuidelineSource>) => void;
  removeGuidelineSource: (id: string) => void;
  setEmbeddingsProgress: (progress: EmbeddingsProgress) => void;
  setIsInitialized: (initialized: boolean) => void;
  setIsLoadingModel: (loading: boolean) => void;
  setModelLoadProgress: (progress: string) => void;
  initializeEmbeddings: (rootNode: GuidelineNode, baseUrl: string) => Promise<void>;
  disposeEmbeddings: () => void;
}

const stateCreator = immer<CodingStandardsState>((set, get) => ({
  // Search
  searchQuery: "",
  isSearching: false,
  searchResults: [],

  // Guidelines sources
  guidelineSources: DEFAULT_GUIDELINE_SOURCES,

  // Embeddings
  embeddingsEngine: null,
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
  performSearch: async (query, rootNode) => {
    if (!query.trim()) {
      set((state) => {
        state.searchResults = [];
      });
      return;
    }
    if (isNullish(rootNode)) {
      set((state) => {
        state.searchResults = [];
      });
      return;
    }

    set((state) => {
      state.isSearching = true;
    });

    try {
      const exactMatches = filterGuidelines({ search: query, rootNode });
      const engine = get().embeddingsEngine;
      const semanticMatches =
        engine?.isReadyForSemanticSearch === true
          ? await engine.findRelevantDocuments({ queryText: query, maxResults: 10 })
          : [];
      const combinedResults = combineSearchResults({ exactMatches, semanticMatches });
      set((state) => {
        state.searchResults = combinedResults;
      });
    } catch (error) {
      console.error("[coding-standards.store] Search error:", error);
      set((state) => {
        state.searchResults = [];
      });
    } finally {
      set((state) => {
        state.isSearching = false;
      });
    }
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
  initializeEmbeddings: async (rootNode, baseUrl) => {
    if (isNullish(rootNode) || !rootNode.children?.length) return;
    if (!isNullish(get().embeddingsEngine)) return;

    try {
      set((state) => {
        state.isLoadingModel = true;
        state.modelLoadProgress = "Initializing Transformer.js...";
      });

      const engine = new EmbeddingsEngine();

      set((state) => {
        state.modelLoadProgress = "Downloading AI model (Xenova/all-MiniLM-L6-v2)...";
      });
      await new Promise((resolve) => setTimeout(resolve, 100));

      await engine.init(rootNode, baseUrl);

      set((state) => {
        state.embeddingsEngine = engine;
        state.isLoadingModel = false;
        state.modelLoadProgress = "Model loaded successfully! Computing embeddings...";
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      set((state) => {
        state.modelLoadProgress = "";
      });

      const computeProgressively = async () => {
        while (engine.nextRuleToCompute) {
          await engine.computeNextRuleEmbedding();
          const stats = engine.computedEmbeddingsStats;
          set((state) => {
            state.embeddingsProgress = {
              isCompleted: stats.isCompleted,
              total: stats.total,
              completed: stats.completed,
              currentRule: stats.nextRuleTitle,
            };
          });
        }
        set((state) => {
          state.isInitialized = true;
        });
      };
      computeProgressively();
    } catch (error) {
      console.error("[coding-standards.store] Failed to initialize embeddings engine:", error);
      set((state) => {
        state.isLoadingModel = false;
        state.modelLoadProgress = `Error: ${error instanceof Error ? error.message : "Failed to load model"}`;
      });
    }
  },

  disposeEmbeddings: () =>
    set((state) => {
      state.embeddingsEngine = null;
      state.isInitialized = false;
      state.embeddingsProgress = {
        isCompleted: false,
        total: 0,
        completed: 0,
        currentRule: "",
      };
      state.modelLoadProgress = "";
    }),
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

// Selectors
const getState = () => useCodingStandardsStore.getState();
export const useSetSearchResults = () => getState().setSearchResults;
export const useDisposeEmbeddings = () => getState().disposeEmbeddings;
export const useInitializeEmbeddings = () => getState().initializeEmbeddings;
export const usePerformSearch = () => getState().performSearch;
export const getEmbeddingsEngine = () => getState().embeddingsEngine;
export const isEngineAvailable = () => !isNullish(getEmbeddingsEngine());
