import { describe, expect, it } from "vitest";

import { CompressorSettings } from "./compressor-settings";

describe("CompressorSettings", () => {
  it("is an exported React component", () => {
    expect(typeof CompressorSettings).toBe("function");
  });
});
