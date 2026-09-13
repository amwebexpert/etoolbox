import type { Tool } from "./tools-registry";

interface SelectToolsArgs {
  tools: Tool[];
  pinnedPaths: string[];
}

export const selectPinnedTools = ({ tools, pinnedPaths }: SelectToolsArgs): Tool[] =>
  pinnedPaths
    .map((path) => tools.find((tool) => tool.path === path))
    .filter((tool): tool is Tool => tool !== undefined);

export const selectUnpinnedTools = ({ tools, pinnedPaths }: SelectToolsArgs): Tool[] =>
  tools.filter((tool) => !pinnedPaths.includes(tool.path));
