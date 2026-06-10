import { describe, expect, it } from "vitest";

import { CompressorPreview } from "./compressor-preview";

describe("CompressorPreview", () => {
  it("is an exported React component", () => {
    expect(typeof CompressorPreview).toBe("function");
  });
});
