import { useCallback, useEffect } from "react";
import {
  useCodingStandardsStore,
  useEnabledGuidelineSourceBaseUrl,
  useIsEngineAvailable,
  useIsReadyForSemanticSearch,
} from "../coding-standards.store";
import { useIngestHubEvent } from "../model-load.store";
import type { GuidelineNode } from "../coding-standards.types";

export const useSemanticSearch = (rootNode: GuidelineNode | null) => {
  const baseUrl = useEnabledGuidelineSourceBaseUrl();
  const { embeddingsProgress, performSearch, initializeEmbeddings } = useCodingStandardsStore();
  const ingestHubEvent = useIngestHubEvent();
  const isEngineAvailable = useIsEngineAvailable();
  const isReadyForSemanticSearch = useIsReadyForSemanticSearch();

  useEffect(() => {
    initializeEmbeddings({
      rootNode: rootNode!,
      baseUrl,
      onModelLoadProgress: ingestHubEvent,
    });
  }, [rootNode, baseUrl, initializeEmbeddings, isEngineAvailable, ingestHubEvent]);

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
