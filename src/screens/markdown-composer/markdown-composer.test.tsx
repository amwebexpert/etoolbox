import { describe, expect, it } from "vitest";

import { TAB_ITEMS } from "./markdown-composer.constants";

describe("markdown-composer TAB_ITEMS", () => {
  it("includes a Markdown Composer tab keyed to /markdown-composer/composer", () => {
    // act
    const composerTab = TAB_ITEMS.find((item) => item.key === "/markdown-composer/composer");

    // assert
    expect(composerTab).toBeDefined();
    expect(composerTab?.label).toBe("Markdown Composer");
  });

  it("includes a Markdown Editor tab keyed to /markdown-composer/editor", () => {
    // act
    const editorTab = TAB_ITEMS.find((item) => item.key === "/markdown-composer/editor");

    // assert
    expect(editorTab).toBeDefined();
    expect(editorTab?.label).toBe("Markdown Editor");
  });

  it("includes a PDF to Markdown tab keyed to /markdown-composer/pdf-to-markdown", () => {
    // act
    const pdfTab = TAB_ITEMS.find((item) => item.key === "/markdown-composer/pdf-to-markdown");

    // assert
    expect(pdfTab).toBeDefined();
    expect(pdfTab?.label).toBe("PDF to Markdown");
  });

  it("lists the Markdown Editor, Markdown Composer, then PDF to Markdown tabs", () => {
    // act
    const keys = TAB_ITEMS.map((item) => item.key);

    // assert
    expect(keys).toEqual([
      "/markdown-composer/editor",
      "/markdown-composer/composer",
      "/markdown-composer/pdf-to-markdown",
    ]);
  });
});
