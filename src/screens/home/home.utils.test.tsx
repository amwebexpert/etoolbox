import { describe, expect, it } from "vitest";

import { FEATURES } from "./home.utils";

describe("home FEATURES", () => {
  it("includes a Diff Viewer card pointing to /diff", () => {
    const diffViewer = FEATURES.find((feature) => feature.path === "/diff");

    expect(diffViewer).toBeDefined();
    expect(diffViewer?.name).toBe("Diff Viewer");
  });
});
