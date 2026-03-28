import { isNullish, yieldToMainThread } from "@lichens-innovation/ts-common";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DEFAULT_GUIDELINE_SOURCES } from "./coding-standards.constants";
import {
  INITIAL_EMBEDDINGS_PROGRESS,
  isValidRootNode,
  runProgressiveEmbeddingComputation,
  runSearch,
} from "./coding-standards.store.utils";
import type { EmbeddingsProgress, GuidelineNode, GuidelineSource, Rule } from "./coding-standards.types";
import { EmbeddingsEngine } from "./utils/embeddings-engine";
import { clearCache } from "./utils/storage.utils";
import { clearTransformersBrowserCache } from "./utils/transformers-cache.utils";
import type { ModelLoadHubProgressEvent } from "./model-load.store.type";
import { useModelLoadStore } from "./model-load.store";

interface PerformSearchArgs {
  query: string;
  rootNode: GuidelineNode | null;
}

interface InitializeEmbeddingsArgs {
  rootNode?: GuidelineNode | null;
  baseUrl: string;
  onModelLoadProgress: (event: ModelLoadHubProgressEvent) => void;
}

interface RecomputeEmbeddingsArgs {
  rootNode?: GuidelineNode | null;
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
  isClearingModelCache: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Rule[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  setIsClearingModelCache: (isClearingModelCache: boolean) => void;
  performSearch: (args: PerformSearchArgs) => Promise<void>;
  setEmbeddingsProgress: (progress: EmbeddingsProgress) => void;
  initializeEmbeddings: (args: InitializeEmbeddingsArgs) => Promise<void>;
  disposeEmbeddings: () => void;
  redownloadModel: (args: RecomputeEmbeddingsArgs) => Promise<void>;
  recomputeAllEmbeddings: (args: RecomputeEmbeddingsArgs) => Promise<void>;
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
  isClearingModelCache: false,

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

  setIsClearingModelCache: (isClearingModelCache) =>
    set((state) => {
      state.isClearingModelCache = isClearingModelCache;
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

  initializeEmbeddings: async ({ rootNode, baseUrl, onModelLoadProgress }) => {
    if (!isValidRootNode(rootNode)) return;
    if (!isNullish(get().embeddingsEngine)) return;

    try {
      const modelLoad = useModelLoadStore.getState();
      modelLoad.reset();
      modelLoad.setGlobalLoading();

      set((state) => {
        state.isLoadingModel = true;
      });

      const engine = new EmbeddingsEngine();
      await yieldToMainThread();

      await engine.init(rootNode, baseUrl, onModelLoadProgress);

      set((state) => {
        state.embeddingsEngine = engine;
        state.isLoadingModel = false;
      });
      modelLoad.setGlobalReady();
      await yieldToMainThread();

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
      useModelLoadStore.getState().setGlobalError(error instanceof Error ? error.message : "Failed to load model");
      set((state) => {
        state.isLoadingModel = false;
      });
    }
  },

  disposeEmbeddings: () => {
    useModelLoadStore.getState().reset();
    set((state) => {
      state.embeddingsEngine = null;
      state.isInitialized = false;
      state.embeddingsProgress = INITIAL_EMBEDDINGS_PROGRESS;
      state.isClearingModelCache = false;
    });
  },

  recomputeAllEmbeddings: async ({ rootNode, baseUrl }) => {
    if (!isValidRootNode(rootNode)) return;
    clearCache();
    get().disposeEmbeddings();
    await get().initializeEmbeddings({
      rootNode,
      baseUrl,
      onModelLoadProgress: useModelLoadStore.getState().ingestHubEvent,
    });
  },

  redownloadModel: async ({ rootNode, baseUrl }) => {
    if (!isValidRootNode(rootNode)) return;

    try {
      get().setIsClearingModelCache(true);
      await clearTransformersBrowserCache();
    } finally {
      get().setIsClearingModelCache(false);
    }

    await get().recomputeAllEmbeddings({ rootNode, baseUrl });
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

// Selectors
export const useRedownloadModel = () => useCodingStandardsStore((state) => state.redownloadModel);
export const useRecomputeAllEmbeddings = () => useCodingStandardsStore((state) => state.recomputeAllEmbeddings);
export const useIsClearingModelCache = () => useCodingStandardsStore((state) => state.isClearingModelCache);

export const useGetEmbeddingsEngine = () => useCodingStandardsStore((state) => state.embeddingsEngine);
export const useIsEngineAvailable = () => {
  const engine = useGetEmbeddingsEngine();
  return !isNullish(engine);
};
export const useIsReadyForSemanticSearch = () =>
  useCodingStandardsStore(
    ({ isInitialized, embeddingsEngine }) => isInitialized && embeddingsEngine?.isReadyForSemanticSearch === true
  );

export const useEnabledGuidelineSourceBaseUrl = () =>
  useCodingStandardsStore((state) => state.guidelineSources.find((s) => s.enabled)?.url ?? "");
