import { describe, expect, it } from "vitest";

import { getTemplateExample, TEMPLATE_EXAMPLES } from "./markdown-composer.constants";

describe("markdown-composer.constants", () => {
  it("provides a template example for each engine", () => {
    expect(TEMPLATE_EXAMPLES.handlebars).toContain("{{name}}");
    expect(TEMPLATE_EXAMPLES.eta).toContain("<%= it.name %>");
    expect(TEMPLATE_EXAMPLES.liquidjs).toContain("{{ name | capitalize }}");
  });

  it("returns the example for the requested engine", () => {
    expect(getTemplateExample("eta")).toBe(TEMPLATE_EXAMPLES.eta);
  });
});
