import { getErrorMessage, isNullish, yieldToMainThread } from "@lichens-innovation/ts-common";
import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import type { Draft } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { logger } from "~/utils/logger";

import { DEFAULT_GUIDELINE_SOURCES } from "./coding-standards.constants";
import {
  createInitializedEmbeddingsEngine,
  INITIAL_EMBEDDINGS_PROGRESS,
  isValidRootNode,
  runProgressiveEmbeddingComputation,
  runSearch,
} from "./coding-standards.store.utils";
import type { EmbeddingsProgress, GuidelineNode, GuidelineSource, Rule } from "./coding-standards.types";
import { useModelLoadStore } from "./model-load.store";
import type { ModelLoadHubProgressEvent } from "./model-load.store.type";
import type { EmbeddingsEngine } from "./utils/embeddings-engine";
import { clearCache } from "./utils/storage.utils";
import { clearTransformersBrowserCache } from "./utils/transformers-cache.utils";

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

  guidelineSources: GuidelineSource[];

  embeddingsEngine: EmbeddingsEngine | null;
  embeddingsProgress: EmbeddingsProgress;
  isInitialized: boolean;
  isLoadingModel: boolean;
  isClearingModelCache: boolean;

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

type CodingStandardsSet = (recipe: (state: Draft<CodingStandardsState>) => void) => void;
type CodingStandardsGet = () => CodingStandardsState;

interface CodingStandardsSliceArgs {
  set: CodingStandardsSet;
  get: CodingStandardsGet;
}

type SettersSlice = Pick<
  CodingStandardsState,
  "setSearchQuery" | "setSearchResults" | "setIsSearching" | "setIsClearingModelCache" | "setEmbeddingsProgress"
>;
type SearchSlice = Pick<CodingStandardsState, "performSearch">;
type EmbeddingsLoadSlice = Pick<CodingStandardsState, "initializeEmbeddings">;
type EmbeddingsResetSlice = Pick<
  CodingStandardsState,
  "disposeEmbeddings" | "recomputeAllEmbeddings" | "redownloadModel"
>;

const createSettersSlice = ({ set }: CodingStandardsSliceArgs): SettersSlice => ({
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

  setEmbeddingsProgress: (progress) =>
    set((state) => {
      state.embeddingsProgress = progress;
    }),
});

const createSearchSlice = ({ get }: CodingStandardsSliceArgs): SearchSlice => ({
  performSearch: async ({ query, rootNode }) => {
    const { setIsSearching, setSearchResults } = get();
    setIsSearching(true);

    try {
      setSearchResults(await runSearch({ query, rootNode, embeddingsEngine: get().embeddingsEngine }));
    } catch (error) {
      logger.error({ error }, "[coding-standards.store] Search error");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  },
});

const createEmbeddingsLoadSlice = ({ set, get }: CodingStandardsSliceArgs): EmbeddingsLoadSlice => ({
  initializeEmbeddings: async ({ rootNode, baseUrl, onModelLoadProgress }) => {
    if (!isValidRootNode(rootNode) || !isNullish(get().embeddingsEngine)) return;

    const modelLoad = useModelLoadStore.getState();
    try {
      modelLoad.reset();
      modelLoad.setGlobalLoading();
      set((state) => {
        state.isLoadingModel = true;
      });

      const engine = await createInitializedEmbeddingsEngine({ rootNode, baseUrl, onModelLoadProgress });
      set((state) => {
        state.embeddingsEngine = engine;
        state.isLoadingModel = false;
      });
      modelLoad.setGlobalReady();
      await yieldToMainThread();

      await runProgressiveEmbeddingComputation({ engine, onProgress: get().setEmbeddingsProgress });
      set((state) => {
        state.isInitialized = true;
      });
    } catch (error) {
      logger.error({ error }, "[coding-standards.store] Failed to initialize embeddings engine");
      modelLoad.setGlobalError(getErrorMessage(error));
      set((state) => {
        state.isLoadingModel = false;
      });
    }
  },
});

const createEmbeddingsResetSlice = ({ set, get }: CodingStandardsSliceArgs): EmbeddingsResetSlice => ({
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
    const { ingestHubEvent } = useModelLoadStore.getState();
    await get().initializeEmbeddings({ rootNode, baseUrl, onModelLoadProgress: ingestHubEvent });
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
});

const stateCreator = immer<CodingStandardsState>((set, get) => ({
  // Search
  searchQuery: "",
  isSearching: false,
  searchResults: [],

  guidelineSources: DEFAULT_GUIDELINE_SOURCES,

  embeddingsEngine: null,
  embeddingsProgress: INITIAL_EMBEDDINGS_PROGRESS,
  isInitialized: false,
  isLoadingModel: false,
  isClearingModelCache: false,

  ...createSettersSlice({ set, get }),
  ...createSearchSlice({ set, get }),
  ...createEmbeddingsLoadSlice({ set, get }),
  ...createEmbeddingsResetSlice({ set, get }),
}));

const PERSISTED_STORE_NAME = "etoolbox-coding-standards";

export const useCodingStandardsStore = createDevToolsStore(PERSISTED_STORE_NAME, () =>
  create<CodingStandardsState>()(
    persist(stateCreator, {
      name: PERSISTED_STORE_NAME,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        searchQuery: state.searchQuery,
        guidelineSources: state.guidelineSources,
      }),
    })
  )
);

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

export const useIsLoadingModel = () => useCodingStandardsStore((state) => state.isLoadingModel);
