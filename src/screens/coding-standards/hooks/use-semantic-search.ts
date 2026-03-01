import { isNullish } from "@lichens-innovation/ts-common";
import { useCallback, useEffect } from "react";
import {
  useCodingStandardsStore,
  useGetEmbeddingsEngine,
  useInitializeEmbeddings,
  useIsEngineAvailable,
  usePerformSearch,
} from "../coding-standards.store";
import type { GuidelineNode } from "../coding-standards.types";

interface UseSemanticSearchArgs {
  rootNode: GuidelineNode | null;
  baseUrl: string;
}

export const useSemanticSearch = ({ rootNode, baseUrl }: UseSemanticSearchArgs) => {
  const { setEmbeddingsProgress, embeddingsProgress, isInitialized } = useCodingStandardsStore();
  const isEngineAvailable = useIsEngineAvailable();
  const engine = useGetEmbeddingsEngine();

  const initializeEmbeddings = useInitializeEmbeddings();

  // Initialize embeddings engine via store when rootNode is available
  useEffect(() => {
    if (isNullish(rootNode) || isEngineAvailable) return;
    initializeEmbeddings(rootNode, baseUrl);
  }, [rootNode, baseUrl, initializeEmbeddings, isEngineAvailable]);

  // Update progress periodically from store engine
  useEffect(() => {
    if (isInitialized) return;
    const interval = setInterval(() => {
      if (isNullish(engine)) return;
      const stats = engine.computedEmbeddingsStats;
      setEmbeddingsProgress({
        isCompleted: stats.isCompleted,
        total: stats.total,
        completed: stats.completed,
        currentRule: stats.nextRuleTitle,
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isInitialized, setEmbeddingsProgress, engine]);

  const performSearch = usePerformSearch();
  const search = useCallback(
    (query: string) => {
      performSearch({ query, rootNode });
    },
    [rootNode, performSearch]
  );

  const isReady = useCodingStandardsStore(
    (state) => state.isInitialized && state.embeddingsEngine?.isReadyForSemanticSearch === true
  );

  return {
    search,
    embeddingsProgress,
    isReady,
  };
};
