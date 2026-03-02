import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { PeriodsInMS } from "@lichens-innovation/ts-common";
import { GuidelinesQueryKey } from "../coding-standards.constants";
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
  const enabledSourceUrls = sources.filter((s) => s.enabled).map((s) => s.url);
  const shouldFetch = enabledSourceUrls.length > 0;

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: GuidelinesQueryKey.markdown(enabledSourceUrls),
    queryFn: () => collectAllGuidelinesIntoSingleRoot(sources),
    enabled: shouldFetch,
    placeholderData: keepPreviousData,
    staleTime: 5 * PeriodsInMS.oneMinute,
    gcTime: 30 * PeriodsInMS.oneMinute,
  });

  const rootNode = data ?? null;

  return {
    rootNode,
    isLoadingGuidelines: isLoading && shouldFetch,
    isFetchingGuidelines: isFetching,
    isGuidelinesError: isError,
    guidelinesError: error as Error | null,
    refetchGuidelines: refetch,
  };
};
