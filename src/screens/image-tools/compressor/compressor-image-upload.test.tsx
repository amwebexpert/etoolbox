import { describe, expect, it } from "vitest";

import { CompressorImageUpload } from "./compressor-image-upload";

describe("CompressorImageUpload", () => {
  it("is an exported React component", () => {
    expect(typeof CompressorImageUpload).toBe("function");
  });
});
