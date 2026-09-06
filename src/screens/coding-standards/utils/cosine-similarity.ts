import similarity from "compute-cosine-similarity";

import type { EmbeddingVector } from "../coding-standards.types";

interface CosineSimilarityArgs {
  vecA: EmbeddingVector;
  vecB: EmbeddingVector;
}

export const cosineSimilarity = ({ vecA, vecB }: CosineSimilarityArgs): number => {
  if (!vecA?.length || !vecB?.length) {
    return 0;
  }

  if (vecA.length !== vecB.length) {
    throw new Error(`Vectors must have the same length ${vecA.length} !== ${vecB.length}`);
  }

  const cosineSim = similarity(vecA, vecB);
  return cosineSim ? Number.parseFloat(cosineSim.toFixed(7)) : 0;
};
