import { describe, expect, it } from "vitest";

import { CompressorImagePanel } from "./compressor-image-panel";

describe("CompressorImagePanel", () => {
  it("is an exported React component", () => {
    expect(typeof CompressorImagePanel).toBe("function");
  });
});
