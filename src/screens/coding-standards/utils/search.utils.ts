import { isNullish } from "@lichens-innovation/ts-common";
import type { GuidelineNode, Rule } from "../coding-standards.types";
import { AVOID_PREFER_PREFIXES } from "../coding-standards.constants";
import { buildOrderedNodes, cloneAndRemoveAllParents } from "./markdown-parser";

const normalizeForSearch = (search: string): string => search.toLowerCase().replaceAll("`", "").trim();

const hasDescendentMatching = (node: GuidelineNode): boolean =>
  node.isMatching || node.children.some((child) => child.isMatching) || node.children.some(hasDescendentMatching);

const isParentOfAvoidPreferSection = (node: GuidelineNode): boolean =>
  node.children.some((child) => AVOID_PREFER_PREFIXES.some((prefix) => child.title.toLowerCase().startsWith(prefix)));

interface FilterGuidelinesArgs {
  search: string;
  rootNode: GuidelineNode;
}

export const filterGuidelines = ({ search, rootNode }: FilterGuidelinesArgs): Rule[] => {
  if (isNullish(rootNode)) return [];

  const normalizedSearch = normalizeForSearch(search);
  if (!normalizedSearch) return [];

  // traverse the tree and mark nodes that match the search inside its markdownLines
  const clonedRoot = cloneAndRemoveAllParents(rootNode);
  const allOrderedNodes = buildOrderedNodes({ node: clonedRoot });
  for (const node of allOrderedNodes) {
    node.isMatching =
      normalizeForSearch(node.title).includes(normalizedSearch) ||
      node.markdownLines.some((line) => normalizeForSearch(line).includes(normalizedSearch));
  }

  // traverse the tree and determine which nodes to show
  for (const node of allOrderedNodes) {
    if (!isParentOfAvoidPreferSection(node)) continue;

    node.shouldDisplayNode = node.isMatching || hasDescendentMatching(node);
  }

  const matchingNodes = allOrderedNodes.filter((node) => node.shouldDisplayNode);

  // Convert GuidelineNodes to Rules
  const rules: Rule[] = [];
  for (const node of matchingNodes) {
    if (node.children.length > 0) {
      // Extract rules from children (Avoid/Prefer sections)
      for (const child of node.children) {
        const content = child.markdownLines.join("\n");
        rules.push({
          title: child.title,
          content: `${child.title}\n${content}`,
          href: child.href,
          category: "general", // Will be set by embeddings engine
        });
      }
    } else {
      // Direct rule
      const content = node.markdownLines.join("\n");
      rules.push({
        title: node.title,
        content: `${node.title}\n${content}`,
        href: node.href,
        category: "general",
      });
    }
  }

  return rules;
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
