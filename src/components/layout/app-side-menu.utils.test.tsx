import { describe, expect, it } from "vitest";

import { TOOLS } from "~/tools/tools-registry";

import { MENU_ITEMS } from "./app-side-menu.utils";

describe("app-side-menu MENU_ITEMS", () => {
  it("starts with the Home entry keyed to /", () => {
    // assert
    expect(MENU_ITEMS[0]?.key).toBe("/");
  });

  it("renders one entry per registry tool, keyed to the tool's path", () => {
    // act
    const toolItems = MENU_ITEMS.filter((item) => item?.key !== "/");

    // assert
    expect(toolItems).toHaveLength(TOOLS.length);
    for (const tool of TOOLS) {
      const item = MENU_ITEMS.find((menuItem) => menuItem?.key === tool.path);
      expect(item).toBeDefined();
    }
  });

  it("includes a Diff Viewer entry keyed to /diff", () => {
    // act
    const diffViewer = MENU_ITEMS.find((item) => item?.key === "/diff");

    // assert
    expect(diffViewer).toBeDefined();
  });

  it("includes a Markdown entry keyed to /markdown-composer", () => {
    // act
    const markdown = MENU_ITEMS.find((item) => item?.key === "/markdown-composer");

    // assert
    expect(markdown).toBeDefined();
  });
});
