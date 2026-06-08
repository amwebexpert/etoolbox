import { describe, expect, it } from "vitest";

import { useImageDimensions } from "./use-image-dimensions";

describe("useImageDimensions", () => {
  it("is an exported React hook", () => {
    expect(typeof useImageDimensions).toBe("function");
  });
});
