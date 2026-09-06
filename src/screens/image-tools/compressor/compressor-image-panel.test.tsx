import { describe, expect, it } from "vitest";

import { CompressorImagePanel } from "./compressor-image-panel";

describe("CompressorImagePanel", () => {
  it("is an exported React component", () => {
    // act
    const componentType = typeof CompressorImagePanel;

    // assert
    expect(componentType).toBe("function");
  });
});
