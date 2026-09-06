import { isNullish } from "@lichens-innovation/ts-common";

import { logger } from "~/utils/logger";

import type { EmbeddingVector, Rule, SerializedEmbedding } from "../coding-standards.types";

const STORAGE_KEY = "etoolbox-coding-standards-embeddings";

const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return hash.toString(36);
};

const buildStorageKey = (rule: Rule): string => `rule-${rule.href}`;

const getStoredEmbeddings = (): Record<string, SerializedEmbedding> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    logger.error({ error }, "[storage.utils] Failed to load embeddings");
    return {};
  }
};

const saveStoredEmbeddings = (embeddings: Record<string, SerializedEmbedding>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(embeddings));
  } catch (error) {
    logger.error({ error }, "[storage.utils] Failed to save embeddings");
  }
};

export const saveEmbedding = (rule: Rule): void => {
  if (isNullish(rule.embedding)) return;

  const embeddings = getStoredEmbeddings();
  const key = buildStorageKey(rule);
  const serializedEmbedding: SerializedEmbedding = {
    href: rule.href,
    contentSha256: simpleHash(rule.content),
    embedding: rule.embedding,
    timestamp: Date.now(),
  };

  embeddings[key] = serializedEmbedding;
  saveStoredEmbeddings(embeddings);
};

export const loadEmbedding = (rule: Rule): EmbeddingVector | null => {
  const embeddings = getStoredEmbeddings();
  const key = buildStorageKey(rule);
  const serializedEmbedding = embeddings[key];

  if (isNullish(serializedEmbedding?.embedding)) {
    return null;
  }

  // Verify content hash matches habit-hooks-disable non-essential-comment
  if (simpleHash(rule.content) === serializedEmbedding.contentSha256) {
    return serializedEmbedding.embedding;
  }

  // Remove outdated embedding habit-hooks-disable non-essential-comment
  delete embeddings[key];
  saveStoredEmbeddings(embeddings);
  return null;
};

export const clearCache = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
