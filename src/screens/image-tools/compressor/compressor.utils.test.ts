import { describe, expect, it } from "vitest";

import { compressImage } from "./compressor.utils";

describe("compressImage", () => {
  it("is an exported function", () => {
    expect(typeof compressImage).toBe("function");
  });
});
