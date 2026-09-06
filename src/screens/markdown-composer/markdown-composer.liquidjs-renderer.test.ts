import { describe, expect, it } from "vitest";

import { createLiquidjsRenderer } from "./markdown-composer.liquidjs-renderer";

describe("createLiquidjsRenderer", () => {
  it("renders LiquidJS output syntax with filters", async () => {
    const renderer = createLiquidjsRenderer();

    const result = await renderer({ template: "Hello {{ name | capitalize }}", data: { name: "ada" } });

    expect(result).toBe("Hello Ada");
  });

  it("does not HTML-escape rendered output", async () => {
    const renderer = createLiquidjsRenderer();

    const result = await renderer({ template: "{{ html }}", data: { html: "<strong>Ada</strong>" } });

    expect(result).toBe("<strong>Ada</strong>");
  });

  it("rejects invalid LiquidJS syntax", async () => {
    const renderer = createLiquidjsRenderer();

    await expect(renderer({ template: "# Hello {% if %}", data: { name: "Ada" } })).rejects.toThrow();
  });
});
