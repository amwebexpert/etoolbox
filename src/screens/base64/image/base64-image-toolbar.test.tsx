import { describe, expect, it } from "vitest";

import { Base64ImageToolbar } from "./base64-image-toolbar";

describe("Base64ImageToolbar", () => {
  it("is an exported React component", () => {
    expect(typeof Base64ImageToolbar).toBe("function");
  });
});
