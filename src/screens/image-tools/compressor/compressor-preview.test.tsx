import { describe, expect, it } from "vitest";

import { CompressorPreview } from "./compressor-preview";

describe("CompressorPreview", () => {
  it("is an exported React component", () => {
    // act
    const componentType = typeof CompressorPreview;

    // assert
    expect(componentType).toBe("function");
  });
});
