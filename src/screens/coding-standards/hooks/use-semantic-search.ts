import { isNullish } from "@lichens-innovation/ts-common";
import { useCallback, useEffect } from "react";
import { useCodingStandardsStore } from "../coding-standards.store";
import type { GuidelineNode } from "../coding-standards.types";

export const useSemanticSearch = (rootNode: GuidelineNode | null, baseUrl: string) => {
  const { setEmbeddingsProgress, embeddingsProgress, isInitialized } = useCodingStandardsStore();

  // Initialize embeddings engine via store when rootNode is available
  useEffect(() => {
    if (isNullish(rootNode) || useCodingStandardsStore.getState().embeddingsEngine) return;
    useCodingStandardsStore.getState().initializeEmbeddings(rootNode, baseUrl);
  }, [rootNode, baseUrl]);

  // Update progress periodically from store engine
  useEffect(() => {
    if (isInitialized) return;
    const interval = setInterval(() => {
      const engine = useCodingStandardsStore.getState().embeddingsEngine;
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
  }, [isInitialized, setEmbeddingsProgress]);

  const search = useCallback(
    (query: string) => {
      useCodingStandardsStore.getState().performSearch(query, rootNode);
    },
    [rootNode]
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
