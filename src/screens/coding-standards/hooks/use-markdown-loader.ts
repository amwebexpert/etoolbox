import { useState, useEffect } from "react";
import type { GuidelineNode, GuidelineSource } from "../coding-standards.types";
import { buildNode, createGuidelineNodes } from "../utils/markdown-parser";

const fetchMarkdownText = async (url: string): Promise<string> => {
  const response = await fetch(url, { method: "GET", redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.text();
};

const collectAllGuidelinesIntoSingleRoot = async (sources: GuidelineSource[]): Promise<GuidelineNode> => {
  const rootNode: GuidelineNode = buildNode({
    level: 0,
    title: "Root TOC node grouping all guidelines",
    href: "",
    baseUrl: "",
  });

  const enabledSources = sources.filter((source) => source.enabled);
  const results = await Promise.all(enabledSources.map((source) => fetchMarkdownText(source.url)));

  results.forEach((text, index) => {
    createGuidelineNodes({ rootNode, text, baseUrl: enabledSources[index].url });
  });

  return rootNode;
};

export const useMarkdownLoader = (sources: GuidelineSource[]) => {
  const [rootNode, setRootNode] = useState<GuidelineNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadGuidelines = async () => {
      if (sources.length === 0 || !sources.some((s) => s.enabled)) {
        setRootNode(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const node = await collectAllGuidelinesIntoSingleRoot(sources);
        setRootNode(node);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to load guidelines");
        console.error("[useMarkdownLoader] Failed to load guidelines:", error);
        setError(error);
        setRootNode(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadGuidelines();
  }, [sources]);

  return { rootNode, isLoading, error };
};
