import { describe, expect, it } from "vitest";

import { MENU_ITEMS } from "./app-side-menu.utils";

describe("app-side-menu MENU_ITEMS", () => {
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
