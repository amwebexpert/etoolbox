import type { Locator, Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "../../fixtures/pages.fixture";
import { clearMarkdownComposerPersistedStore, clearMarkdownEditorPersistedStore } from "../../helpers/storage";
import type { MarkdownComposerPage } from "../../pages/markdown-composer-page";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE_MARKDOWN_PATH = path.join(dirname, "../../fixtures/files/sample-markdown.md");

interface TabCase {
  name: string;
  goto: (markdownComposerPage: MarkdownComposerPage) => Promise<void>;
  clearStore: (page: Page) => Promise<void>;
  typeContent: (markdownComposerPage: MarkdownComposerPage, text: string) => Promise<void>;
  content: (markdownComposerPage: MarkdownComposerPage) => Locator;
}

const TAB_CASES: TabCase[] = [
  {
    name: "Markdown Editor",
    goto: (markdownComposerPage) => markdownComposerPage.gotoEditor(),
    clearStore: clearMarkdownEditorPersistedStore,
    typeContent: (markdownComposerPage, text) => markdownComposerPage.typeInEditor(text),
    content: (markdownComposerPage) => markdownComposerPage.editorProseMirror(),
  },
  {
    name: "Markdown Composer",
    goto: (markdownComposerPage) => markdownComposerPage.gotoComposer(),
    clearStore: clearMarkdownComposerPersistedStore,
    typeContent: (markdownComposerPage, text) => markdownComposerPage.setMarkdown(text),
    content: (markdownComposerPage) => markdownComposerPage.editorContent(),
  },
];

for (const tabCase of TAB_CASES) {
  test.describe(`${tabCase.name} tab — import/export`, () => {
    test.beforeEach(async ({ page, markdownComposerPage }) => {
      await tabCase.goto(markdownComposerPage);
      await tabCase.clearStore(page);
      await page.reload();
    });

    test("exporting downloads a .md file containing the current markdown", async ({ page, markdownComposerPage }) => {
      // arrange
      await tabCase.typeContent(markdownComposerPage, "# Exported content");
      await expect(tabCase.content(markdownComposerPage)).toContainText("Exported content");

      // act
      const downloadPromise = page.waitForEvent("download");
      await markdownComposerPage.exportButton().click();
      const download = await downloadPromise;
      const downloadPath = await download.path();

      // assert
      expect(download.suggestedFilename()).toBe("document.md");
      const content = downloadPath ? fs.readFileSync(downloadPath, "utf-8") : "";
      expect(content).toContain("Exported content");
    });

    test("importing over empty content applies immediately with no confirmation", async ({ markdownComposerPage }) => {
      // arrange — clear the default content and wait for the toolbar to observe it
      await tabCase.typeContent(markdownComposerPage, "");
      await expect(markdownComposerPage.exportButton()).toBeDisabled();

      // act
      await markdownComposerPage.importFile(SAMPLE_MARKDOWN_PATH);

      // assert
      await expect(markdownComposerPage.replaceContentConfirmDialog()).toBeHidden();
      await expect(tabCase.content(markdownComposerPage)).toContainText("Imported Title");
      await expect(tabCase.content(markdownComposerPage)).toContainText("Imported paragraph content.");
    });

    test("importing over non-empty content requires confirming before it replaces the content", async ({
      markdownComposerPage,
    }) => {
      // arrange
      await tabCase.typeContent(markdownComposerPage, "Existing unsaved content");
      await expect(markdownComposerPage.exportButton()).toBeEnabled();

      // act
      await markdownComposerPage.importFile(SAMPLE_MARKDOWN_PATH);

      // assert — confirmation required, content unchanged until confirmed
      await expect(markdownComposerPage.replaceContentConfirmDialog()).toBeVisible();
      await expect(tabCase.content(markdownComposerPage)).toContainText("Existing unsaved content");

      // act — confirm
      await markdownComposerPage.replaceContentConfirmDialog().getByRole("button", { name: "Replace" }).click();

      // assert
      await expect(tabCase.content(markdownComposerPage)).toContainText("Imported Title");
    });
  });
}

test.describe("Markdown Composer tab — import scope", () => {
  test.beforeEach(async ({ page, markdownComposerPage }) => {
    await markdownComposerPage.gotoComposer();
    await clearMarkdownComposerPersistedStore(page);
    await page.reload();
  });

  test("importing markdown does not touch the JSON data or the selected template engine", async ({
    markdownComposerPage,
  }) => {
    // arrange
    await markdownComposerPage.jsonDataTextarea().fill('{"name":"Ada"}');
    await markdownComposerPage.selectEngine("Eta");
    await markdownComposerPage.setMarkdown("");

    // act
    await markdownComposerPage.importFile(SAMPLE_MARKDOWN_PATH);

    // assert
    await expect(markdownComposerPage.jsonDataTextarea()).toHaveValue('{"name":"Ada"}');
    await expect(markdownComposerPage.editorContent()).toContainText("Imported Title");
  });
});
