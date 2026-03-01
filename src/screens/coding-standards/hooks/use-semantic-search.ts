import { isNullish } from "@lichens-innovation/ts-common";
import { useCallback, useEffect } from "react";
import {
  useCodingStandardsStore,
  useInitializeEmbeddings,
  useIsEngineAvailable,
  useIsReadyForSemanticSearch,
  usePerformSearch,
} from "../coding-standards.store";
import type { GuidelineNode } from "../coding-standards.types";

interface UseSemanticSearchArgs {
  rootNode: GuidelineNode | null;
  baseUrl: string;
}

export const useSemanticSearch = ({ rootNode, baseUrl }: UseSemanticSearchArgs) => {
  const embeddingsProgress = useCodingStandardsStore((state) => state.embeddingsProgress);
  const isEngineAvailable = useIsEngineAvailable();
  const initializeEmbeddings = useInitializeEmbeddings();
  const performSearch = usePerformSearch();
  const isReady = useIsReadyForSemanticSearch();

  // Initialize embeddings engine via store when rootNode is available
  useEffect(() => {
    if (isNullish(rootNode) || isEngineAvailable) return;
    initializeEmbeddings({ rootNode: rootNode!, baseUrl });
  }, [rootNode, baseUrl, initializeEmbeddings, isEngineAvailable]);

  const search = useCallback(
    (query: string) => {
      performSearch({ query, rootNode });
    },
    [rootNode, performSearch]
  );

  return {
    search,
    embeddingsProgress,
    isReady,
  };
};
