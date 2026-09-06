import { beforeEach, describe, expect, it } from "vitest";

import { DEFAULT_JSON_DATA_TEXT, DEFAULT_MARKDOWN, useMarkdownComposerStore } from "./markdown-composer.store";

describe("useMarkdownComposerStore", () => {
  beforeEach(() => {
    useMarkdownComposerStore.setState({
      markdown: DEFAULT_MARKDOWN,
      jsonDataText: DEFAULT_JSON_DATA_TEXT,
      engine: "handlebars",
    });
  });

  it("starts with the default markdown template", () => {
    expect(useMarkdownComposerStore.getState().markdown).toBe(DEFAULT_MARKDOWN);
  });

  it("starts with the default JSON data", () => {
    expect(useMarkdownComposerStore.getState().jsonDataText).toBe(DEFAULT_JSON_DATA_TEXT);
  });

  it("starts with the handlebars engine", () => {
    expect(useMarkdownComposerStore.getState().engine).toBe("handlebars");
  });

  it("updates the markdown via setMarkdown", () => {
    useMarkdownComposerStore.getState().setMarkdown("# custom");

    expect(useMarkdownComposerStore.getState().markdown).toBe("# custom");
  });

  it("updates the JSON data text via setJsonDataText", () => {
    useMarkdownComposerStore.getState().setJsonDataText('{"a":1}');

    expect(useMarkdownComposerStore.getState().jsonDataText).toBe('{"a":1}');
  });

  it("keeps the markdown and JSON data independent", () => {
    useMarkdownComposerStore.getState().setMarkdown("body");
    useMarkdownComposerStore.getState().setJsonDataText('{"x":true}');

    const state = useMarkdownComposerStore.getState();
    expect(state.markdown).toBe("body");
    expect(state.jsonDataText).toBe('{"x":true}');
  });
});
