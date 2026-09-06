import { describe, expect, it, vi } from "vitest";

vi.mock("@lichens-innovation/react-markdown-composer", () => ({
  MarkdownComposer: () => null,
}));

const { MarkdownComposerScreen } = await import("./markdown-composer");

describe("MarkdownComposerScreen", () => {
  it("is an exported React component", () => {
    expect(typeof MarkdownComposerScreen).toBe("function");
  });
});
