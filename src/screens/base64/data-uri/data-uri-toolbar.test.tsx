import { describe, expect, it } from "vitest";

import { DataUriToolbar } from "./data-uri-toolbar";

describe("DataUriToolbar", () => {
  it("is an exported React component", () => {
    // act
    const componentType = typeof DataUriToolbar;

    // assert
    expect(componentType).toBe("function");
  });
});
