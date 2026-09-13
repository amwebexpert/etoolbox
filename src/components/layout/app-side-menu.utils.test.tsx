import { describe, expect, it } from "vitest";

import { TOOLS } from "~/tools/tools-registry";

import { buildMenuItems } from "./app-side-menu.utils";

const noop = () => {};

const findPinnedGroup = (items: unknown[]): Record<string, unknown> | undefined =>
  items.find((item): item is Record<string, unknown> => (item as Record<string, unknown>)?.type === "group");

const pinnedGroupChildKeys = (items: unknown[]): (string | undefined)[] => {
  const children = (findPinnedGroup(items)?.children ?? []) as { key?: string }[];
  return children.map((child) => child.key);
};

describe("buildMenuItems", () => {
  it("starts with the Home entry keyed to /", () => {
    // act
    const items = buildMenuItems({ pinnedPaths: [], onTogglePinned: noop });

    // assert
    expect((items[0] as { key?: string })?.key).toBe("/");
  });

  it("renders one entry per registry tool when nothing is pinned", () => {
    // act
    const items = buildMenuItems({ pinnedPaths: [], onTogglePinned: noop });
    const toolItems = items.filter((item) => (item as { key?: string })?.key !== "/");

    // assert
    expect(toolItems).toHaveLength(TOOLS.length);
    for (const tool of TOOLS) {
      const item = items.find((menuItem) => (menuItem as { key?: string })?.key === tool.path);
      expect(item).toBeDefined();
    }
  });

  it("adds no Pinned group or divider when nothing is pinned", () => {
    // act
    const items = buildMenuItems({ pinnedPaths: [], onTogglePinned: noop });

    // assert
    expect(items.some((item) => (item as { type?: string })?.type === "group")).toBe(false);
    expect(items.some((item) => (item as { type?: string })?.type === "divider")).toBe(false);
  });

  it("groups pinned tools under a Pinned group in pinned order", () => {
    // act
    const items = buildMenuItems({ pinnedPaths: ["/base64", "/json"], onTogglePinned: noop });

    // assert
    expect(pinnedGroupChildKeys(items)).toEqual(["/base64", "/json"]);
  });

  it("adds a divider after the pinned group", () => {
    // act
    const items = buildMenuItems({ pinnedPaths: ["/json"], onTogglePinned: noop });

    // assert
    expect(items.some((item) => (item as { type?: string })?.type === "divider")).toBe(true);
  });

  it("removes a pinned tool from the flat list below so it is not duplicated", () => {
    // act
    const items = buildMenuItems({ pinnedPaths: ["/json"], onTogglePinned: noop });
    const flatMatches = items.filter((item) => (item as { key?: string })?.key === "/json");

    // assert
    expect(flatMatches).toHaveLength(0);
  });

  it("includes a Diff Viewer entry keyed to /diff", () => {
    // act
    const items = buildMenuItems({ pinnedPaths: [], onTogglePinned: noop });

    // assert
    expect(items.some((item) => (item as { key?: string })?.key === "/diff")).toBe(true);
  });
});
