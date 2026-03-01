import { env, pipeline, type FeatureExtractionPipeline, type Tensor } from "@xenova/transformers";
import { isNullish } from "@lichens-innovation/ts-common";
import type { EmbeddingVector, GuidelineNode, Rule } from "../coding-standards.types";
import { cosineSimilarity } from "./cosine-similarity";
import { loadEmbedding, saveEmbedding } from "./storage.utils";
import { loadAllRulesWithCategory } from "./markdown-parser";

// Skip initial check for local models, since we are not loading any local models.
env.allowLocalModels = false;

// TODO Ticket-001 Due to a bug in onnxruntime-web, we must disable multithreading for now.
// @see https://github.com/microsoft/onnxruntime/issues/14445 for more information.
env.backends.onnx.wasm.numThreads = 1;

const LlmModel = {
  all_minilm_l6_v2: "Xenova/all-MiniLM-L6-v2",
};

type RelevantDocumentsArgs = {
  queryText: string;
  maxResults?: number;
};

type ComputedEmbeddingsStats = {
  isCompleted: boolean;
  total: number;
  completed: number;
  nextRuleTitle: string;
};

const tensorToEmbeddingVector = (tensor: Tensor): EmbeddingVector =>
  Array.from(tensor.data as number[]).map((v) => Number.parseFloat(v.toFixed(7)));

export class EmbeddingsEngine {
  private featureExtractionEmbeddings: FeatureExtractionPipeline | null = null;
  private rules: Rule[] = [];

  get hasRules(): boolean {
    return this.rules.length > 0;
  }

  get isReadyForSemanticSearch(): boolean {
    return this.hasRules && this.rules.every((rule) => !!rule.embedding);
  }

  get computedEmbeddingsStats(): ComputedEmbeddingsStats {
    return {
      isCompleted: this.isReadyForSemanticSearch,
      total: this.rules.length,
      completed: this.rules.filter((rule) => !!rule.embedding).length,
      nextRuleTitle: this.nextRuleToCompute?.title ?? "",
    };
  }

  get nextRuleToCompute(): Rule | null {
    return this.rules.find((rule) => isNullish(rule.embedding)) ?? null;
  }

  async computeNextRuleEmbedding(): Promise<void> {
    if (isNullish(this.featureExtractionEmbeddings)) throw Error("Model should be loaded first");
    const rule = this.nextRuleToCompute;
    if (isNullish(rule)) return;

    const embeddings = loadEmbedding(rule);
    if (embeddings) {
      rule.embedding = embeddings;
    } else {
      await this.computeRuleEmbedding(rule);
      saveEmbedding(rule);
    }

    //console.info(`[EmbeddingsEngine] Computed embedding for: ${rule.title}`);
  }

  async computeRuleEmbedding(rule: Rule): Promise<void> {
    console.info(`[EmbeddingsEngine] Computing rule embeddings: ${rule.title}`);

    if (isNullish(this.featureExtractionEmbeddings)) return;
    const createEmbedding = this.featureExtractionEmbeddings;

    const tensor: Tensor = await createEmbedding(rule.content, { pooling: "mean", normalize: false });

    rule.embedding = tensorToEmbeddingVector(tensor);
  }

  async computeAllEmbeddings(): Promise<void> {
    if (isNullish(this.featureExtractionEmbeddings)) throw Error("Model should be loaded first");

    // @see Ticket-001 regarding multiple threads
    // const embeddingPromises = this.rules.map((rule) => this.computeRuleEmbedding(rule))
    // await Promise.all(embeddingPromises)
    while (this.nextRuleToCompute) {
      await this.computeNextRuleEmbedding();
    }

    console.info("[EmbeddingsEngine] Computed embeddings for all rules. END.");
  }

  async init(rootNode: GuidelineNode | null, baseUrl: string): Promise<void> {
    if (isNullish(rootNode) || !rootNode.children?.length) throw Error("Guidelines should be loaded first");

    this.rules = loadAllRulesWithCategory(rootNode, baseUrl).map((rule) => ({
      ...rule,
      embedding: undefined,
      similarity: undefined,
    }));

    console.info(`[EmbeddingsEngine] Initializing with ${this.rules.length} rules`);
    this.featureExtractionEmbeddings = await pipeline("feature-extraction", LlmModel.all_minilm_l6_v2);
    // TODO Ticket-001: await this.computeEmbeddings()
  }

  async findRelevantDocuments(configs: RelevantDocumentsArgs): Promise<Rule[]> {
    if (!this.isReadyForSemanticSearch) return [];
    if (isNullish(this.featureExtractionEmbeddings)) throw Error("Cannot compute embeddings");

    const { queryText, maxResults = 5 } = configs;
    const tensor: Tensor = await this.featureExtractionEmbeddings(queryText, {
      pooling: "mean",
      normalize: true,
    });
    const queryTextEmbedding = tensorToEmbeddingVector(tensor);

    const rules: Rule[] = this.rules
      .map((rule) => ({
        ...rule,
        similarity: cosineSimilarity(queryTextEmbedding, rule.embedding ?? []),
      }))
      .sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0))
      .slice(0, maxResults);

    return rules;
  }

  async findRelevantDocument(queryText: string): Promise<Rule | null> {
    const docs = await this.findRelevantDocuments({ queryText, maxResults: 1 });
    return docs[0] ?? null;
  }
}
