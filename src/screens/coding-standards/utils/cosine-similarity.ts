import similarity from "compute-cosine-similarity";
import type { EmbeddingVector } from "../coding-standards.types";

export const cosineSimilarity = (vecA: EmbeddingVector, vecB: EmbeddingVector): number => {
  if (!vecA?.length || !vecB?.length) {
    return 0;
  }

  if (vecA.length !== vecB.length) {
    throw new Error(`Vectors must have the same length ${vecA.length} !== ${vecB.length}`);
  }

  const cosineSim = similarity(vecA, vecB);
  return cosineSim ? Number.parseFloat(cosineSim.toFixed(7)) : 0;
};
