import { isNullish } from "@lichens-innovation/ts-common";
import type { CodingCategory, GuidelineNode } from "../coding-standards.types";
import { AVOID_PREFER_PREFIXES } from "../coding-standards.constants";

type GuidelineFromTextArgs = {
  rootNode: GuidelineNode;
  text: string;
  baseUrl: string;
};

type RuleWithoutCategory = {
  title: string;
  href: string;
  content: string;
};

type RuleWithCategory = {
  title: string;
  href: string;
  content: string;
  category: CodingCategory;
};

export const createGuidelineNodes = ({ rootNode, text, baseUrl }: GuidelineFromTextArgs): GuidelineNode => {
  const { toc, content } = splitTocAndContent({ text, baseUrl });
  buildGuidelineNodesFromToC({ rootNode, text: toc, baseUrl });

  const allOrderedNodes = buildOrderedNodes({ node: rootNode });
  populateGuidelineNodesSearchableContent({ allOrderedNodes, content });

  return rootNode;
};

type PopulateMarkdownLinesFromContentArgs = {
  allOrderedNodes: GuidelineNode[];
  content: string;
};

export const populateGuidelineNodesSearchableContent = ({
  allOrderedNodes,
  content,
}: PopulateMarkdownLinesFromContentArgs): void => {
  const allContentLines = content.split("\n");
  let contentLineIndex = 0;
  const orderedNodes = allOrderedNodes.slice(1); // skip root 'TOC' node level 0

  // traverse all lines and populate markdownLines of each node when line is not a title
  for (const node of orderedNodes) {
    let line = allContentLines[contentLineIndex];

    // move to next line if current line is the title of the node
    if (line === node.titleMarkdown) {
      contentLineIndex++;
      line = allContentLines[contentLineIndex];
    }

    // populate markdownLines until next title line
    while (!isNullish(line) && !line.startsWith("#")) {
      node.markdownLines.push(line);
      contentLineIndex++;
      line = allContentLines[contentLineIndex];
    }
  }
};

type BuildOrderedNodesArgs = {
  node: GuidelineNode;
  allOrderedNodes?: GuidelineNode[];
};

export const buildOrderedNodes = ({ node, allOrderedNodes = [] }: BuildOrderedNodesArgs): GuidelineNode[] => {
  allOrderedNodes.push(node);

  for (const subLink of node.children) {
    buildOrderedNodes({ node: subLink, allOrderedNodes });
  }

  return allOrderedNodes;
};

type SplitTocAndContentResult = {
  toc: string;
  content: string;
};

type SplitTocAndContentArgs = {
  text: string;
  baseUrl: string;
};

export const splitTocAndContent = ({ text, baseUrl }: SplitTocAndContentArgs): SplitTocAndContentResult => {
  const regex = /^# .*\n/gm; // split at very first level one title line, starting with "# "
  const match = regex.exec(text);
  if (isNullish(match)) {
    const message = `No title found in markdown for ${baseUrl}`;
    console.error("[markdown-parser]", message, text);
    throw new Error(message);
  }

  const toc = text.slice(0, match.index);
  const content = text.slice(match.index);

  return {
    toc,
    content,
  };
};

export const buildGuidelineNodesFromToC = ({ rootNode, text, baseUrl }: GuidelineFromTextArgs): GuidelineNode => {
  const lines = text
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .filter((line) => !line.toLowerCase().startsWith("table of content"));

  buildGuidelineLinksFromLines({ node: rootNode, lines, currentLineIndex: 0, baseUrl });
  return rootNode;
};

type ParseTocLineResult = {
  level: number;
  title: string;
  href: string;
};

/**
 * Extract title, level and href from line
 *
 * Example 1: '- [Project coding standards](#project-coding-standards)'
 *     level: 1
 *     title: 'Project coding standards'
 *     href: 'project-coding-standards'
 * Example 2: '  - [avoid `{renderAbc()}` pattern](#avoid-renderabc-pattern)'
 *     level: 2
 *     title: 'avoid `{renderAbc()}` pattern'
 *     href: 'avoid-renderabc-pattern'
 */
export const parseTocLine = (line: string): ParseTocLineResult => {
  const regex = /^( *)-\s*\[(.*?)\]\(#(.*?)\)$/;
  const match = line.match(regex);
  if (isNullish(match)) throw new Error(`Invalid TOC line: ${line}`);

  const level = match[1].length / 2 + 1;
  const title = match[2];
  const href = match[3];

  return { level, title, href };
};

const normalizeTitle = (title: string): string => title.replaceAll("\\", "");

type BuildTitleMarkdownArgs = { level: number; title: string };

const buildTitleMarkdown = ({ level, title }: BuildTitleMarkdownArgs): string =>
  `${"#".repeat(level)} ${normalizeTitle(title)}`;

type BuildNodeArgs = {
  parent?: GuidelineNode;
  level: number;
  title: string;
  baseUrl: string;
  href: string;
};

export const buildNode = ({ parent, level, title, href, baseUrl }: BuildNodeArgs): GuidelineNode => ({
  parent,
  level,
  title,
  titleMarkdown: buildTitleMarkdown({ level, title }),
  href: `${baseUrl
    .replace(/raw\.githubusercontent/, "github")
    .replace("/master/", "/blob/master/")
    .replace("/raw/", "/blob/")}#${href}`,
  markdownLines: [],
  children: [],
});

type FindParentNodeArgs = {
  node: GuidelineNode;
  level: number;
};

export const findParentNodeForLevel = ({ node, level }: FindParentNodeArgs): GuidelineNode => {
  let currentNode = node;
  while (currentNode.level >= level) {
    if (isNullish(currentNode.parent)) throw new Error(`no parent for level ${level} - ${currentNode.title}`);
    currentNode = currentNode.parent;
  }

  return currentNode;
};

type BuildGuidelineLinksFromLinesArgs = {
  baseUrl: string;
  node: GuidelineNode;
  lines: string[];
  currentLineIndex?: number;
};

export const buildGuidelineLinksFromLines = ({
  baseUrl,
  node,
  lines,
  currentLineIndex = 0,
}: BuildGuidelineLinksFromLinesArgs): void => {
  const line = lines[currentLineIndex];

  if (isNullish(line)) return;

  const { level, title, href } = parseTocLine(line);

  if (level > node.level) {
    const newNode = buildNode({ parent: node, level, title, href, baseUrl });
    node.children.push(newNode);

    buildGuidelineLinksFromLines({
      baseUrl,
      node: newNode,
      lines,
      currentLineIndex: currentLineIndex + 1,
    });

    return;
  }

  const parentNode = findParentNodeForLevel({ node, level });
  buildGuidelineLinksFromLines({ node: parentNode, lines, currentLineIndex, baseUrl });
};

export const cloneAndRemoveAllParents = (node: GuidelineNode): GuidelineNode => {
  const newNode: GuidelineNode = {
    ...node,
    parent: undefined,
    shouldDisplayNode: undefined,
    isMatching: undefined,
  };

  newNode.children = newNode.children?.map(cloneAndRemoveAllParents) ?? [];

  return newNode;
};

export const isAvoidOrPreferTitle = (title: string): boolean =>
  AVOID_PREFER_PREFIXES.some((prefix) => title.toLowerCase().startsWith(prefix));

const extractRuleContent = (node: GuidelineNode): string => {
  const content = node.children
    .map(({ title, markdownLines }) => {
      const lines = markdownLines.join("\n");
      return `${title}\n${lines}`;
    })
    .join("\n");

  return content;
};

export const extractFullRule = (node: GuidelineNode): RuleWithoutCategory => {
  const { title, href } = node;
  const content = extractRuleContent(node);

  return { title, href, content };
};

export const loadRules = (guidelineNode: GuidelineNode): RuleWithoutCategory[] => {
  const rules: RuleWithoutCategory[] = [];
  for (const child of guidelineNode.children) {
    rules.push(extractFullRule(child));
  }

  return rules;
};

export const loadAllRules = (rootNode: GuidelineNode): RuleWithoutCategory[] => {
  const rules: RuleWithoutCategory[] = [];

  for (const guidelineNode of rootNode.children) {
    const guidelineNodeRules = loadRules(guidelineNode);
    rules.push(...guidelineNodeRules);
  }

  return rules;
};

const detectCategory = (title: string, url: string): CodingCategory => {
  const lowerTitle = title.toLowerCase();
  const lowerUrl = url.toLowerCase();

  const titleOrLink = [lowerTitle, lowerUrl];

  if (titleOrLink.some((text) => text.includes("react"))) return "react";
  if (titleOrLink.some((text) => text.includes("typescript"))) return "typescript";
  if (titleOrLink.some((text) => text.includes("test"))) return "testing";
  if (titleOrLink.some((text) => text.includes("naming"))) return "naming";

  return "general";
};

export const loadAllRulesWithCategory = (rootNode: GuidelineNode, baseUrl: string): RuleWithCategory[] => {
  const rules: RuleWithCategory[] = [];

  for (const guidelineNode of rootNode.children) {
    const category = detectCategory(guidelineNode.title, baseUrl);
    const guidelineNodeRules = loadRules(guidelineNode);
    rules.push(...guidelineNodeRules.map((rule) => ({ ...rule, category })));
  }

  return rules;
};
