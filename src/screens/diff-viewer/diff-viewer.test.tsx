import { describe, expect, it } from "vitest";

import { DiffViewer } from "./diff-viewer";

describe("DiffViewer", () => {
  it("is an exported React component", () => {
    // act
    const componentType = typeof DiffViewer;

    // assert
    expect(componentType).toBe("function");
  });
});
