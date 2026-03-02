import { isBlank, isNullish } from "@lichens-innovation/ts-common";
import type { EmbeddingsProgress, GuidelineNode, Rule } from "./coding-standards.types";
import type { EmbeddingsEngine } from "./utils/embeddings-engine";
import { combineSearchResults, filterGuidelines } from "./utils/search.utils";

export const MAX_RESULTS_FOR_SEMANTIC_SEARCH = 10;

export const INITIAL_EMBEDDINGS_PROGRESS: EmbeddingsProgress = {
  isCompleted: false,
  total: 0,
  completed: 0,
  currentRule: "",
};

interface RunSearchArgs {
  query: string;
  rootNode: GuidelineNode | null;
  embeddingsEngine: EmbeddingsEngine | null;
}

export const runSearch = async ({ query, rootNode, embeddingsEngine }: RunSearchArgs): Promise<Rule[]> => {
  if (isBlank(query) || isNullish(rootNode)) return [];
  const isReady = embeddingsEngine?.isReadyForSemanticSearch === true;

  const exactMatches = filterGuidelines({ search: query, rootNode });
  const semanticMatches = isReady
    ? await embeddingsEngine.findRelevantDocuments({ queryText: query, maxResults: MAX_RESULTS_FOR_SEMANTIC_SEARCH })
    : [];
  return combineSearchResults({ exactMatches, semanticMatches });
};

interface EmbeddingsStatsFromEngine {
  isCompleted: boolean;
  total: number;
  completed: number;
  nextRuleTitle: string;
}

const toEmbeddingsProgress = (stats: EmbeddingsStatsFromEngine): EmbeddingsProgress => ({
  isCompleted: stats.isCompleted,
  total: stats.total,
  completed: stats.completed,
  currentRule: stats.nextRuleTitle,
});

export const runProgressiveEmbeddingComputation = async (
  engine: EmbeddingsEngine,
  onProgress: (progress: EmbeddingsProgress) => void
): Promise<void> => {
  while (engine.nextRuleToCompute) {
    await engine.computeNextRuleEmbedding();
    onProgress(toEmbeddingsProgress(engine.computedEmbeddingsStats));
  }
};
