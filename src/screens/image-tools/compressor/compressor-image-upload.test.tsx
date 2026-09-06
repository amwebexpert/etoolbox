import { describe, expect, it } from "vitest";

import { CompressorImageUpload } from "./compressor-image-upload";

describe("CompressorImageUpload", () => {
  it("is an exported React component", () => {
    // act
    const componentType = typeof CompressorImageUpload;

    // assert
    expect(componentType).toBe("function");
  });
});
