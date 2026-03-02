import { isNullish, yieldToMainThread } from "@lichens-innovation/ts-common";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DEFAULT_GUIDELINE_SOURCES } from "./coding-standards.constants";
import {
  INITIAL_EMBEDDINGS_PROGRESS,
  runProgressiveEmbeddingComputation,
  runSearch,
} from "./coding-standards.store.utils";
import type { EmbeddingsProgress, GuidelineNode, GuidelineSource, Rule } from "./coding-standards.types";
import { EmbeddingsEngine } from "./utils/embeddings-engine";

interface PerformSearchArgs {
  query: string;
  rootNode: GuidelineNode | null;
}

interface InitializeEmbeddingsArgs {
  rootNode: GuidelineNode;
  baseUrl: string;
}

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
  performSearch: (args: PerformSearchArgs) => Promise<void>;
  setEmbeddingsProgress: (progress: EmbeddingsProgress) => void;
  initializeEmbeddings: (args: InitializeEmbeddingsArgs) => Promise<void>;
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
  embeddingsProgress: INITIAL_EMBEDDINGS_PROGRESS,
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

  performSearch: async ({ query, rootNode }) => {
    set((state) => {
      state.isSearching = true;
    });

    try {
      const results = await runSearch({
        query,
        rootNode,
        embeddingsEngine: get().embeddingsEngine,
      });
      set((state) => {
        state.searchResults = results;
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

  setEmbeddingsProgress: (progress) =>
    set((state) => {
      state.embeddingsProgress = progress;
    }),

  initializeEmbeddings: async ({ rootNode, baseUrl }) => {
    if (isNullish(rootNode) || !rootNode.children?.length) return;
    if (!isNullish(get().embeddingsEngine)) return;

    try {
      set((state) => {
        state.isLoadingModel = true;
        state.modelLoadProgress = "Initializing Transformer.js...";
      });

      const engine = new EmbeddingsEngine();

      set((state) => {
        state.modelLoadProgress = "Downloading AI model...";
      });
      await yieldToMainThread();

      await engine.init(rootNode, baseUrl);

      set((state) => {
        state.embeddingsEngine = engine;
        state.isLoadingModel = false;
        state.modelLoadProgress = "Model loaded successfully! Computing embeddings...";
      });
      await yieldToMainThread();
      set((state) => {
        state.modelLoadProgress = "";
      });

      await runProgressiveEmbeddingComputation(engine, (progress) =>
        set((state) => {
          state.embeddingsProgress = progress;
        })
      );

      set((state) => {
        state.isInitialized = true;
      });
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
      state.embeddingsProgress = INITIAL_EMBEDDINGS_PROGRESS;
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
export const useSetSearchResults = () => useCodingStandardsStore((state) => state.setSearchResults);
export const useDisposeEmbeddings = () => useCodingStandardsStore((state) => state.disposeEmbeddings);
export const useInitializeEmbeddings = () => useCodingStandardsStore((state) => state.initializeEmbeddings);
export const usePerformSearch = () => useCodingStandardsStore((state) => state.performSearch);

export const useGetEmbeddingsEngine = () => useCodingStandardsStore((state) => state.embeddingsEngine);
export const useIsInitialized = () => useCodingStandardsStore((state) => state.isInitialized);
export const useIsEngineAvailable = () => {
  const engine = useGetEmbeddingsEngine();
  return !isNullish(engine);
};
export const useIsReadyForSemanticSearch = () =>
  useCodingStandardsStore(
    ({ isInitialized, embeddingsEngine }) => isInitialized && embeddingsEngine?.isReadyForSemanticSearch === true
  );
