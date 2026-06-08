import { describe, expect, it } from "vitest";

import { DataUriToolbar } from "./data-uri-toolbar";

describe("DataUriToolbar", () => {
  it("is an exported React component", () => {
    expect(typeof DataUriToolbar).toBe("function");
  });
});
