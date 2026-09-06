import { describe, expect, it } from "vitest";

import { DataUri } from "./data-uri";

describe("DataUri", () => {
  it("is an exported React component", () => {
    // act
    const componentType = typeof DataUri;

    // assert
    expect(componentType).toBe("function");
  });
});
