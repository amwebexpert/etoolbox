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
    // act
    const markdown = useMarkdownComposerStore.getState().markdown;

    // assert
    expect(markdown).toBe(DEFAULT_MARKDOWN);
  });

  it("starts with the default JSON data", () => {
    // act
    const jsonDataText = useMarkdownComposerStore.getState().jsonDataText;

    // assert
    expect(jsonDataText).toBe(DEFAULT_JSON_DATA_TEXT);
  });

  it("starts with the handlebars engine", () => {
    // act
    const engine = useMarkdownComposerStore.getState().engine;

    // assert
    expect(engine).toBe("handlebars");
  });

  it("updates the markdown via setMarkdown", () => {
    // arrange
    const store = useMarkdownComposerStore.getState();
    const nextMarkdown = "# custom";

    // act
    store.setMarkdown(nextMarkdown);

    // assert
    expect(useMarkdownComposerStore.getState().markdown).toBe(nextMarkdown);
  });

  it("updates the JSON data text via setJsonDataText", () => {
    // arrange
    const store = useMarkdownComposerStore.getState();
    const nextJson = '{"a":1}';

    // act
    store.setJsonDataText(nextJson);

    // assert
    expect(useMarkdownComposerStore.getState().jsonDataText).toBe(nextJson);
  });

  it("updates the engine via setEngine", () => {
    // arrange
    const store = useMarkdownComposerStore.getState();

    // act
    store.setEngine("eta");

    // assert
    expect(useMarkdownComposerStore.getState().engine).toBe("eta");
  });

  it("keeps the markdown and JSON data independent", () => {
    // arrange
    const store = useMarkdownComposerStore.getState();

    // act
    store.setMarkdown("body");
    store.setJsonDataText('{"x":true}');
    const state = useMarkdownComposerStore.getState();

    // assert
    expect(state.markdown).toBe("body");
    expect(state.jsonDataText).toBe('{"x":true}');
  });
});
