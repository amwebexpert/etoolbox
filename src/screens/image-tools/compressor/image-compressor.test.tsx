import { describe, expect, it } from "vitest";

import { ImageOcrCompressor } from "./image-compressor";

describe("ImageOcrCompressor", () => {
  it("is an exported React component", () => {
    // act
    const componentType = typeof ImageOcrCompressor;

    // assert
    expect(componentType).toBe("function");
  });

  it("uses the ImageOcrCompressor function name", () => {
    // act
    const componentName = ImageOcrCompressor.name;

    // assert
    expect(componentName).toBe("ImageOcrCompressor");
  });
});
