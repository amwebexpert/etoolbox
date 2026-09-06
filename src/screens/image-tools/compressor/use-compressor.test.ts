import { describe, expect, it } from "vitest";

import { useCompressor } from "./use-compressor";

describe("useCompressor", () => {
  it("is an exported React hook", () => {
    // act
    const hookType = typeof useCompressor;

    // assert
    expect(hookType).toBe("function");
  });
});
