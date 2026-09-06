import { describe, expect, it, vi } from "vitest";

interface MockRenderTemplateArgs {
  template: string;
  data: unknown;
}

vi.mock("@lichens-innovation/react-markdown-composer", () => ({
  MarkdownComposer: () => null,
  createHandlebarsRenderer: () => (args: MockRenderTemplateArgs) => args.template,
}));

const { MarkdownComposerScreen } = await import("./markdown-composer");

describe("MarkdownComposerScreen", () => {
  it("is an exported React component", () => {
    expect(typeof MarkdownComposerScreen).toBe("function");
  });
});
