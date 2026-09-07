import { expect, test } from "../../fixtures/pages.fixture";
import { clearMarkdownEditorPersistedStore } from "../../helpers/storage";

test.beforeEach(async ({ page, markdownComposerPage }) => {
  await markdownComposerPage.gotoEditor();
  await clearMarkdownEditorPersistedStore(page);
  await page.reload();
});

test("typing in the Markdown Editor persists across a page reload", async ({ page, markdownComposerPage }) => {
  // arrange
  await markdownComposerPage.typeInEditor("Hello from the editor");
  await expect(markdownComposerPage.editorProseMirror()).toContainText("Hello from the editor");

  // act
  await page.reload();

  // assert
  await expect(markdownComposerPage.editorProseMirror()).toContainText("Hello from the editor");
});

test("the Markdown Editor theme follows the app dark mode toggle", async ({ page }) => {
  // arrange
  await page.getByRole("button", { name: "Settings" }).click();
  const darkModeSwitch = page.getByRole("switch");
  await expect(darkModeSwitch).not.toBeChecked();

  // act
  await darkModeSwitch.click();

  // assert
  await expect
    .poll(() =>
      page.evaluate(() => document.getElementById("milkdown-crepe-theme-stylesheet")?.getAttribute("href") ?? "")
    )
    .toContain("frame-dark");
});
