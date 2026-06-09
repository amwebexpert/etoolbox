import { describe, expect, it } from "vitest";

import { useCompressorStore } from "./compressor.store";

describe("useCompressorStore", () => {
  it("is an exported function", () => {
    expect(typeof useCompressorStore).toBe("function");
  });
});
