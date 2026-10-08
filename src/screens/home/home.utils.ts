import { isBlank } from "@lichens-innovation/ts-common";

import type { Tool } from "~/tools/tools-registry";

interface FilterToolsArgs {
  tools: Tool[];
  query: string;
}

export const filterTools = ({ tools, query }: FilterToolsArgs): Tool[] => {
  const normalizedQuery = query.trim().toLowerCase();
  if (isBlank(normalizedQuery)) {
    return tools;
  }

  return tools.filter((tool) => {
    const haystack = `${tool.name} ${tool.description}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
};
