import { useCallback, useEffect, useRef } from "react";
import { useCodingStandardsStore } from "../coding-standards.store";
import type { GuidelineNode } from "../coding-standards.types";
import { EmbeddingsEngine } from "../utils/embeddings-engine";
import { combineSearchResults, filterGuidelines } from "../utils/search.utils";

export const useSemanticSearch = (rootNode: GuidelineNode | null, baseUrl: string) => {
  const embeddingsEngineRef = useRef<EmbeddingsEngine | null>(null);
  const {
    setSearchResults,
    setIsSearching,
    setEmbeddingsProgress,
    setIsInitialized,
    setIsLoadingModel,
    setModelLoadProgress,
    embeddingsProgress,
    isInitialized,
  } = useCodingStandardsStore();

  // Initialize embeddings engine
  useEffect(() => {
    if (!rootNode || embeddingsEngineRef.current) return;

    const initialize = async () => {
      try {
        setIsLoadingModel(true);
        setModelLoadProgress("Initializing Transformer.js...");

        const engine = new EmbeddingsEngine();

        // Load model with progress updates
        setModelLoadProgress("Downloading AI model (Xenova/all-MiniLM-L6-v2)...");

        // Add a small delay to ensure UI updates
        await new Promise((resolve) => setTimeout(resolve, 100));

        await engine.init(rootNode, baseUrl);

        setModelLoadProgress("Model loaded successfully! Computing embeddings...");
        setIsLoadingModel(false);
        embeddingsEngineRef.current = engine;

        // Small delay to show success message
        await new Promise((resolve) => setTimeout(resolve, 300));
        setModelLoadProgress("");

        // Start computing embeddings progressively
        const computeProgressively = async () => {
          while (engine.nextRuleToCompute) {
            await engine.computeNextRuleEmbedding();
            const stats = engine.computedEmbeddingsStats;
            setEmbeddingsProgress({
              isCompleted: stats.isCompleted,
              total: stats.total,
              completed: stats.completed,
              currentRule: stats.nextRuleTitle,
            });
          }
          setIsInitialized(true);
        };

        computeProgressively();
      } catch (error) {
        console.error("[useSemanticSearch] Failed to initialize embeddings engine:", error);
        setIsLoadingModel(false);
        setModelLoadProgress(`Error: ${error instanceof Error ? error.message : "Failed to load model"}`);
      }
    };

    initialize();
  }, [rootNode, baseUrl, setEmbeddingsProgress, setIsInitialized, setIsLoadingModel, setModelLoadProgress]);

  // Update progress periodically
  useEffect(() => {
    if (!embeddingsEngineRef.current || isInitialized) return;

    const interval = setInterval(() => {
      if (embeddingsEngineRef.current) {
        const stats = embeddingsEngineRef.current.computedEmbeddingsStats;
        setEmbeddingsProgress({
          isCompleted: stats.isCompleted,
          total: stats.total,
          completed: stats.completed,
          currentRule: stats.nextRuleTitle,
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isInitialized, setEmbeddingsProgress]);

  const search = useCallback(
    async (query: string) => {
      if (!query.trim() || !rootNode) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);

      try {
        // Exact match search
        const exactMatches = filterGuidelines({ search: query, rootNode });

        const engine = embeddingsEngineRef.current;
        if (!engine) return;
        const semanticMatches = engine.isReadyForSemanticSearch
          ? await engine.findRelevantDocuments({ queryText: query, maxResults: 10 })
          : [];

        // Combine results
        const combinedResults = combineSearchResults({ exactMatches, semanticMatches });

        setSearchResults(combinedResults);
      } catch (error) {
        console.error("[useSemanticSearch] Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [rootNode, setSearchResults, setIsSearching]
  );

  return {
    search,
    embeddingsProgress,
    isReady: isInitialized && embeddingsEngineRef.current?.isReadyForSemanticSearch,
  };
};
