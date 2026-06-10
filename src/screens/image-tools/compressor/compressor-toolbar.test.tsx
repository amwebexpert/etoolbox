import { describe, expect, it } from "vitest";

import { CompressorToolbar } from "./compressor-toolbar";

describe("CompressorToolbar", () => {
  it("is an exported React component", () => {
    expect(typeof CompressorToolbar).toBe("function");
  });
});
