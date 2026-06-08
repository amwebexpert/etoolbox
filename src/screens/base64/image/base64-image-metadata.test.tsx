import { describe, expect, it } from "vitest";

import { Base64ImageMetadata } from "./base64-image-metadata";

describe("Base64ImageMetadata", () => {
  it("is an exported React component", () => {
    expect(typeof Base64ImageMetadata).toBe("function");
  });
});
