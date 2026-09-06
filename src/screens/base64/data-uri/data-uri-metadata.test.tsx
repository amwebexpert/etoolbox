import { describe, expect, it } from "vitest";

import { DataUriMetadata } from "./data-uri-metadata";

describe("DataUriMetadata", () => {
  it("is an exported React component", () => {
    // act
    const componentType = typeof DataUriMetadata;

    // assert
    expect(componentType).toBe("function");
  });
});
