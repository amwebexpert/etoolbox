import { describe, expect, it } from "vitest";

import { TOOLS } from "~/tools/tools-registry";

import { buildMenuItems } from "./app-side-menu.utils";

const noop = () => {};

interface MenuNode {
  key?: string;
  type?: string;
}

const buildNodes = (pinnedPaths: string[]): MenuNode[] =>
  buildMenuItems({ pinnedPaths, onTogglePinned: noop }) as MenuNode[];

const pinnedGroupChildKeys = (nodes: MenuNode[]): (string | undefined)[] => {
  const pinnedGroup = nodes.find((node) => node.type === "group") as { children?: { key?: string }[] } | undefined;
  return (pinnedGroup?.children ?? []).map((child) => child.key);
};

describe("buildMenuItems", () => {
  it("starts with the Home entry keyed to /", () => {
    // act
    const nodes = buildNodes([]);

    // assert
    expect(nodes[0]?.key).toBe("/");
  });

  it("renders one entry per registry tool when nothing is pinned", () => {
    // act
    const nodes = buildNodes([]);
    const toolItems = nodes.filter((node) => node.key !== "/");

    // assert
    expect(toolItems).toHaveLength(TOOLS.length);
    for (const tool of TOOLS) {
      expect(nodes.find((node) => node.key === tool.path)).toBeDefined();
    }
  });

  it("adds no Pinned group or divider when nothing is pinned", () => {
    // act
    const nodes = buildNodes([]);

    // assert
    expect(nodes.some((node) => node.type === "group")).toBe(false);
    expect(nodes.some((node) => node.type === "divider")).toBe(false);
  });

  it("groups pinned tools under a Pinned group in pinned order", () => {
    // act
    const nodes = buildNodes(["/base64", "/json"]);

    // assert
    expect(pinnedGroupChildKeys(nodes)).toEqual(["/base64", "/json"]);
  });

  it("adds a divider after the pinned group", () => {
    // act
    const nodes = buildNodes(["/json"]);

    // assert
    expect(nodes.some((node) => node.type === "divider")).toBe(true);
  });

  it("removes a pinned tool from the flat list below so it is not duplicated", () => {
    // act
    const nodes = buildNodes(["/json"]);
    const flatMatches = nodes.filter((node) => node.key === "/json");

    // assert
    expect(flatMatches).toHaveLength(0);
  });

  it("includes a Diff Viewer entry keyed to /diff", () => {
    // act
    const nodes = buildNodes([]);

    // assert
    expect(nodes.some((node) => node.key === "/diff")).toBe(true);
  });
});
