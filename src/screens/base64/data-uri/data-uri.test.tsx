import { describe, expect, it } from "vitest";

import { DataUri } from "./data-uri";

describe("DataUri", () => {
  it("is an exported React component", () => {
    expect(typeof DataUri).toBe("function");
  });
});
