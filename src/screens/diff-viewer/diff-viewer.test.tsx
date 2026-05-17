import { describe, expect, it } from "vitest";

import { DiffViewer } from "./diff-viewer";

describe("DiffViewer", () => {
  it("is an exported React component", () => {
    expect(typeof DiffViewer).toBe("function");
  });
});
