import { describe, expect, it } from "vitest";

import { createEtaRenderer } from "./markdown-composer.eta-renderer";

describe("createEtaRenderer", () => {
  it("renders Eta interpolation syntax", () => {
    const renderer = createEtaRenderer();

    const result = renderer({ template: "Hello <%= it.name %>", data: { name: "Ada" } });

    expect(result).toBe("Hello Ada");
  });

  it("throws on invalid Eta syntax", () => {
    const renderer = createEtaRenderer();

    expect(() => renderer({ template: "# Hello <%=", data: { name: "Ada" } })).toThrow();
  });
});
