import { expect, test } from "../../fixtures/pages.fixture";
import { clearMarkdownComposerPersistedStore } from "../../helpers/storage";

test.beforeEach(async ({ page, markdownComposerPage }) => {
  await markdownComposerPage.goto();
  await clearMarkdownComposerPersistedStore(page);
  await page.reload();
});

test("side menu Markdown Composer entry navigates to /markdown-composer", async ({ page }) => {
  // arrange
  await page.goto("/#/");

  // act
  await page.getByRole("menuitem", { name: "Markdown Composer" }).click();

  // assert
  await expect(page).toHaveURL(/#\/markdown-composer$/);
  await expect(page.getByRole("heading", { name: "Markdown Composer" })).toBeVisible();
});

test("typing JSON data and a Handlebars template renders a live preview reflecting both", async ({
  markdownComposerPage,
}) => {
  // arrange
  const jsonData = markdownComposerPage.jsonDataTextarea();
  await jsonData.fill('{"name":"Ada"}');

  // act
  await markdownComposerPage.setMarkdown("# Hello {{name}}");

  // assert
  await expect(markdownComposerPage.jsonErrorAlert()).toHaveCount(0);
  await expect(markdownComposerPage.previewRegion().getByRole("heading", { name: "Hello Ada" })).toBeVisible();
});

test("invalid JSON surfaces an inline error and keeps the prior valid preview", async ({ markdownComposerPage }) => {
  // arrange
  const jsonData = markdownComposerPage.jsonDataTextarea();
  await jsonData.fill('{"name":"Ada"}');
  await markdownComposerPage.setMarkdown("# Hello {{name}}");
  await expect(markdownComposerPage.previewRegion().getByRole("heading", { name: "Hello Ada" })).toBeVisible();

  // act
  await jsonData.fill('{"name": ');

  // assert
  await expect(markdownComposerPage.jsonErrorAlert()).toBeVisible();
  await expect(markdownComposerPage.previewRegion().getByRole("heading", { name: "Hello Ada" })).toBeVisible();
});

test("invalid Handlebars template surfaces the library's template preview error alert", async ({
  markdownComposerPage,
}) => {
  // arrange
  await markdownComposerPage.jsonDataTextarea().fill('{"name":"Ada"}');

  // act
  await markdownComposerPage.setMarkdown("# Hello {{#if}}");

  // assert
  await expect(markdownComposerPage.templatePreviewErrorAlert()).toBeVisible();
});

test("reloading the page restores the previously entered JSON data and markdown", async ({
  markdownComposerPage,
  page,
}) => {
  // arrange
  await markdownComposerPage.jsonDataTextarea().fill('{"greeting":"hi"}');
  await markdownComposerPage.setMarkdown("- {{greeting}} there");
  await expect(markdownComposerPage.previewRegion()).toContainText("hi there");

  // act
  await page.reload();

  // assert
  await expect(markdownComposerPage.jsonDataTextarea()).toHaveValue('{"greeting":"hi"}');
  await expect(markdownComposerPage.editorContent()).toContainText("{{greeting}} there");
  await expect(markdownComposerPage.previewRegion()).toContainText("hi there");
});
