import { useCallback, useEffect } from "react";
import { useCodingStandardsStore, useIsEngineAvailable, useIsReadyForSemanticSearch } from "../coding-standards.store";
import type { GuidelineNode } from "../coding-standards.types";

interface UseSemanticSearchArgs {
  rootNode: GuidelineNode | null;
  baseUrl: string;
}

export const useSemanticSearch = ({ rootNode, baseUrl }: UseSemanticSearchArgs) => {
  const { embeddingsProgress, performSearch, initializeEmbeddings } = useCodingStandardsStore();
  const isEngineAvailable = useIsEngineAvailable();
  const isReadyForSemanticSearch = useIsReadyForSemanticSearch();

  useEffect(() => {
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
    isReadyForSemanticSearch,
  };
};
