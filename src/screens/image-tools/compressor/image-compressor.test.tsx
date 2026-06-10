import { describe, expect, it } from "vitest";

import { ImageOcrCompressor } from "./image-compressor";

describe("ImageOcrCompressor", () => {
  it("is an exported React component", () => {
    expect(typeof ImageOcrCompressor).toBe("function");
  });

  it("uses the ImageOcrCompressor function name", () => {
    expect(ImageOcrCompressor.name).toBe("ImageOcrCompressor");
  });
});
