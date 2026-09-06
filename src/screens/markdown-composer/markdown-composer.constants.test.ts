import { describe, expect, it } from "vitest";

import { getTemplateExample, TEMPLATE_EXAMPLES } from "./markdown-composer.constants";

describe("markdown-composer.constants", () => {
  it("provides a template example for each engine", () => {
    // act
    const handlebarsExample = TEMPLATE_EXAMPLES.handlebars;
    const etaExample = TEMPLATE_EXAMPLES.eta;
    const liquidjsExample = TEMPLATE_EXAMPLES.liquidjs;

    // assert
    expect(handlebarsExample).toContain("{{name}}");
    expect(etaExample).toContain("<%= it.name %>");
    expect(liquidjsExample).toContain("{{ name | capitalize }}");
  });

  it("returns the example for the requested engine", () => {
    // arrange
    const engine = "eta" as const;

    // act
    const example = getTemplateExample(engine);

    // assert
    expect(example).toBe(TEMPLATE_EXAMPLES.eta);
  });
});
