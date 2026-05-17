import { describe, expect, it } from "vitest";

import { MENU_ITEMS } from "./app-side-menu.utils";

describe("app-side-menu MENU_ITEMS", () => {
  it("includes a Diff Viewer entry keyed to /diff", () => {
    const diffViewer = MENU_ITEMS.find((item) => item?.key === "/diff");

    expect(diffViewer).toBeDefined();
  });
});
