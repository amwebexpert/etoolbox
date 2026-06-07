import { describe, expect, it } from "vitest";

import { Base64Image } from "./base64-image";

describe("Base64Image", () => {
  it("is an exported React component", () => {
    expect(typeof Base64Image).toBe("function");
  });
});
