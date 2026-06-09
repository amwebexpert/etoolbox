import { describe, expect, it } from "vitest";

import { useCompressor } from "./use-compressor";

describe("useCompressor", () => {
  it("is an exported function", () => {
    expect(typeof useCompressor).toBe("function");
  });
});
