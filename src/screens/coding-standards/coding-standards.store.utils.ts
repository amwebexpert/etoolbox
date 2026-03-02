import { isBlank, isNullish } from "@lichens-innovation/ts-common";
import type { EmbeddingsProgress, GuidelineNode, GuidelineSource, Rule } from "./coding-standards.types";
import type { EmbeddingsEngine } from "./utils/embeddings-engine";
import { combineSearchResults, filterGuidelines } from "./utils/search.utils";

export const DEFAULT_GUIDELINE_SOURCES: GuidelineSource[] = [
  {
    id: "react-patterns",
    name: "React Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-react-patterns.md",
    enabled: true,
  },
  {
    id: "typescript-patterns",
    name: "TypeScript Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-coding-patterns.md",
    enabled: true,
  },
  {
    id: "testing-patterns",
    name: "Testing Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-unit-testing.md",
    enabled: true,
  },
  {
    id: "naming-patterns",
    name: "Naming Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-naming-patterns.md",
    enabled: true,
  },
];
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

  const exactMatches = filterGuidelines({ search: query, rootNode });
  const semanticMatches =
    embeddingsEngine?.isReadyForSemanticSearch === true
      ? await embeddingsEngine.findRelevantDocuments({ queryText: query, maxResults: 10 })
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
