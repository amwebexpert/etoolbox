export type CodingCategory = "react" | "typescript" | "testing" | "naming" | "general";

export type Rule = {
  title: string;
  content: string;
  href: string;
  category: CodingCategory;
  embedding?: number[];
  similarity?: number;
};

export type GuidelineSource = {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
};

export type SearchFilters = {
  categories: string[];
  minSimilarity: number;
};

export type EmbeddingsProgress = {
  isCompleted: boolean;
  total: number;
  completed: number;
  currentRule: string;
};

export type GuidelineNode = {
  level: number;
  title: string;
  titleMarkdown: string;
  href: string;
  markdownLines: string[];
  children: GuidelineNode[];
  parent?: GuidelineNode;
  isMatching?: boolean;
  shouldDisplayNode?: boolean;
};

export type EmbeddingVector = number[];

export type SerializedEmbedding = {
  href: string;
  contentSha256: string;
  embedding: EmbeddingVector;
  timestamp: number;
};
