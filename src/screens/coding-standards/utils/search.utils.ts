import { isNullish } from "@lichens-innovation/ts-common";

import { AVOID_PREFER_PREFIXES } from "../coding-standards.constants";
import type { GuidelineNode, Rule } from "../coding-standards.types";
import { buildOrderedNodes, cloneAndRemoveAllParents } from "./markdown-parser";

const normalizeForSearch = (search: string): string => search.toLowerCase().replaceAll("`", "").trim();

const hasDescendentMatching = (node: GuidelineNode): boolean =>
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- boolean OR: an explicit `false` must still fall through to check descendants, `??` would not
  node.isMatching || node.children.some((child) => child.isMatching) || node.children.some(hasDescendentMatching);

const isParentOfAvoidPreferSection = (node: GuidelineNode): boolean =>
  node.children.some((child) => AVOID_PREFER_PREFIXES.some((prefix) => child.title.toLowerCase().startsWith(prefix)));

const buildRuleFromNode = (node: GuidelineNode): Rule => {
  const content = node.markdownLines.join("\n");
  return {
    title: node.title,
    content: `${node.title}\n${content}`,
    href: node.href,
    category: "general", // Will be set by embeddings engine
  };
};

// Extract rules from a matching node: its children (Avoid/Prefer sections) if it has any, else itself directly
const extractRulesFromNode = (node: GuidelineNode): Rule[] =>
  node.children.length > 0 ? node.children.map(buildRuleFromNode) : [buildRuleFromNode(node)];

interface FilterGuidelinesArgs {
  search: string;
  rootNode: GuidelineNode;
}

export const filterGuidelines = ({ search, rootNode }: FilterGuidelinesArgs): Rule[] => {
  if (isNullish(rootNode)) return [];

  const normalizedSearch = normalizeForSearch(search);
  if (!normalizedSearch) return [];

  const clonedRoot = cloneAndRemoveAllParents(rootNode);
  const allOrderedNodes = buildOrderedNodes({ node: clonedRoot });
  for (const node of allOrderedNodes) {
    node.isMatching =
      normalizeForSearch(node.title).includes(normalizedSearch) ||
      node.markdownLines.some((line) => normalizeForSearch(line).includes(normalizedSearch));
  }

  for (const node of allOrderedNodes) {
    if (!isParentOfAvoidPreferSection(node)) continue;

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- boolean OR: an explicit `false` must still fall through to check descendants, `??` would not
    node.shouldDisplayNode = node.isMatching || hasDescendentMatching(node);
  }

  const matchingNodes = allOrderedNodes.filter((node) => node.shouldDisplayNode);

  return matchingNodes.flatMap(extractRulesFromNode);
};

interface CombineSearchResultsArgs {
  exactMatches: Rule[];
  semanticMatches: Rule[];
}

export const combineSearchResults = ({ exactMatches, semanticMatches }: CombineSearchResultsArgs): Rule[] => {
  const exactMatchHrefs = new Set(exactMatches.map((rule) => rule.href));
  const combinedResults = [...exactMatches];

  for (const semanticResult of semanticMatches) {
    if (!exactMatchHrefs.has(semanticResult.href)) {
      combinedResults.push(semanticResult);
    }
  }

  return combinedResults;
};
