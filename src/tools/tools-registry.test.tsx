import { describe, expect, it } from "vitest";

import { TOOLS } from "./tools-registry";

describe("TOOLS registry", () => {
  it("exposes unique paths for stable keys", () => {
    // act
    const paths = TOOLS.map((tool) => tool.path);

    // assert
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("includes a Diff Viewer tool pointing to /diff", () => {
    // act
    const diffViewer = TOOLS.find((tool) => tool.path === "/diff");

    // assert
    expect(diffViewer).toBeDefined();
    expect(diffViewer?.name).toBe("Diff Viewer");
  });

  it("includes a Markdown tool pointing to /markdown-composer", () => {
    // act
    const markdown = TOOLS.find((tool) => tool.path === "/markdown-composer");

    // assert
    expect(markdown).toBeDefined();
    expect(markdown?.name).toBe("Markdown");
  });

  it("gives every tool a non-empty name and description", () => {
    // assert
    for (const tool of TOOLS) {
      expect(tool.name.length).toBeGreaterThan(0);
      expect(tool.description.length).toBeGreaterThan(0);
    }
  });
});
