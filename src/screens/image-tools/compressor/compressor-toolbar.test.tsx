import { describe, expect, it } from "vitest";

import { CompressorToolbar } from "./compressor-toolbar";

describe("CompressorToolbar", () => {
  it("is an exported React component", () => {
    // act
    const componentType = typeof CompressorToolbar;

    // assert
    expect(componentType).toBe("function");
  });
});
