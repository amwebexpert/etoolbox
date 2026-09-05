export type CodingCategory = "react" | "typescript" | "testing" | "naming" | "general";

export interface Rule {
  title: string;
  content: string;
  href: string;
  category: CodingCategory;
  embedding?: number[];
  similarity?: number;
}

export interface GuidelineSource {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

export interface EmbeddingsProgress {
  isCompleted: boolean;
  total: number;
  completed: number;
  currentRule: string;
}

export interface GuidelineNode {
  level: number;
  title: string;
  titleMarkdown: string;
  href: string;
  markdownLines: string[];
  // eslint-disable-next-line coding-guide/prefer-props-with-children -- this is a markdown document tree node, not React component props; `children` here is GuidelineNode[], not ReactNode
  children: GuidelineNode[];
  parent?: GuidelineNode;
  isMatching?: boolean;
  shouldDisplayNode?: boolean;
}

export type EmbeddingVector = number[];

export interface SerializedEmbedding {
  href: string;
  contentSha256: string;
  embedding: EmbeddingVector;
  timestamp: number;
}
