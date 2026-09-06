import { describe, expect, it } from "vitest";

import { createEtaRenderer } from "./markdown-composer.eta-renderer";

describe("createEtaRenderer", () => {
  it("renders Eta interpolation syntax", () => {
    // arrange
    const renderer = createEtaRenderer();

    // act
    const result = renderer({ template: "Hello <%= it.name %>", data: { name: "Ada" } });

    // assert
    expect(result).toBe("Hello Ada");
  });

  it("throws on invalid Eta syntax", () => {
    // arrange
    const renderer = createEtaRenderer();

    // act & assert
    expect(() => renderer({ template: "# Hello <%=", data: { name: "Ada" } })).toThrow();
  });
});
