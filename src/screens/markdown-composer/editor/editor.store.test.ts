import { beforeEach, describe, expect, it } from "vitest";

import { DEFAULT_MARKDOWN, useMarkdownEditorStore } from "./editor.store";

describe("useMarkdownEditorStore", () => {
  beforeEach(() => {
    useMarkdownEditorStore.setState({ markdown: DEFAULT_MARKDOWN });
  });

  it("starts with the default markdown content", () => {
    // act
    const markdown = useMarkdownEditorStore.getState().markdown;

    // assert
    expect(markdown).toBe(DEFAULT_MARKDOWN);
  });

  it("updates the markdown via setMarkdown", () => {
    // arrange
    const store = useMarkdownEditorStore.getState();
    const nextMarkdown = "# custom content";

    // act
    store.setMarkdown(nextMarkdown);

    // assert
    expect(useMarkdownEditorStore.getState().markdown).toBe(nextMarkdown);
  });
});
