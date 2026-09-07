import { describe, expect, it } from "vitest";

import { FEATURES } from "./home.utils";

describe("home FEATURES", () => {
  it("includes a Diff Viewer card pointing to /diff", () => {
    // act
    const diffViewer = FEATURES.find((feature) => feature.path === "/diff");

    // assert
    expect(diffViewer).toBeDefined();
    expect(diffViewer?.name).toBe("Diff Viewer");
  });

  it("includes a Markdown card pointing to /markdown-composer", () => {
    // act
    const markdown = FEATURES.find((feature) => feature.path === "/markdown-composer");

    // assert
    expect(markdown).toBeDefined();
    expect(markdown?.name).toBe("Markdown");
  });
});
