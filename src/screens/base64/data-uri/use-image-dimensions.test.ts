import { describe, expect, it } from "vitest";

import { useImageDimensions } from "./use-image-dimensions";

describe("useImageDimensions", () => {
  it("is an exported React hook", () => {
    // act
    const hookType = typeof useImageDimensions;

    // assert
    expect(hookType).toBe("function");
  });
});
