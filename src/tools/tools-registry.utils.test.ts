import { describe, expect, it } from "vitest";

import { TOOLS } from "./tools-registry";
import { selectPinnedTools, selectUnpinnedTools } from "./tools-registry.utils";

describe("selectPinnedTools", () => {
  it("returns pinned tools ordered by the pinned paths, not registry order", () => {
    // act
    const pinned = selectPinnedTools({ tools: TOOLS, pinnedPaths: ["/base64", "/url"] });

    // assert
    expect(pinned.map((tool) => tool.path)).toEqual(["/base64", "/url"]);
  });

  it("returns an empty list when nothing is pinned", () => {
    // act
    const pinned = selectPinnedTools({ tools: TOOLS, pinnedPaths: [] });

    // assert
    expect(pinned).toEqual([]);
  });

  it("ignores pinned paths that no longer match a registry tool", () => {
    // act
    const pinned = selectPinnedTools({ tools: TOOLS, pinnedPaths: ["/json", "/gone"] });

    // assert
    expect(pinned.map((tool) => tool.path)).toEqual(["/json"]);
  });
});

describe("selectUnpinnedTools", () => {
  it("keeps registry order and drops pinned tools", () => {
    // act
    const unpinned = selectUnpinnedTools({ tools: TOOLS, pinnedPaths: ["/json"] });

    // assert
    expect(unpinned.some((tool) => tool.path === "/json")).toBe(false);
    expect(unpinned).toHaveLength(TOOLS.length - 1);
  });

  it("returns every tool when nothing is pinned", () => {
    // act
    const unpinned = selectUnpinnedTools({ tools: TOOLS, pinnedPaths: [] });

    // assert
    expect(unpinned).toHaveLength(TOOLS.length);
  });
});
