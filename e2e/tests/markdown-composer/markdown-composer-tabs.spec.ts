import { expect, test } from "../../fixtures/pages.fixture";
import { clearMarkdownComposerPersistedStore, clearMarkdownEditorPersistedStore } from "../../helpers/storage";
import type { MarkdownComposerPage } from "../../pages/markdown-composer-page";

const TAB_CASES: Array<{
  tabName: string;
  path: string;
  heading: string;
  navigate: (markdownComposerPage: MarkdownComposerPage) => Promise<void>;
}> = [
  {
    tabName: "Markdown Editor",
    path: "/markdown-composer/editor",
    heading: "Markdown Editor",
    navigate: (markdownComposerPage) => markdownComposerPage.gotoEditor(),
  },
  {
    tabName: "Markdown Composer",
    path: "/markdown-composer/composer",
    heading: "Markdown Composer",
    navigate: (markdownComposerPage) => markdownComposerPage.gotoComposer(),
  },
];

test.beforeEach(async ({ page, markdownComposerPage }) => {
  await markdownComposerPage.gotoEditor();
  await clearMarkdownEditorPersistedStore(page);
  await clearMarkdownComposerPersistedStore(page);
  await page.reload();
});

test("markdown-composer index redirects to the Markdown Editor tab", async ({ page }) => {
  // arrange & act
  await page.goto("/#/markdown-composer");

  // assert
  await expect(page).toHaveURL(/#\/markdown-composer\/editor$/);
  await expect(page.getByRole("tab", { name: "Markdown Editor" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: "Markdown Editor" })).toBeVisible();
});

test("can navigate between the Markdown Editor and Markdown Composer tabs", async ({ page, markdownComposerPage }) => {
  // arrange
  await markdownComposerPage.gotoEditor();
  await expect(markdownComposerPage.heading("Markdown Editor")).toBeVisible();

  // act & assert — composer
  await markdownComposerPage.composerTab.click();
  await expect(page).toHaveURL(/#\/markdown-composer\/composer$/);
  await expect(markdownComposerPage.composerTab).toHaveAttribute("aria-selected", "true");
  await expect(markdownComposerPage.heading("Markdown Composer")).toBeVisible();

  // act & assert — back to editor
  await markdownComposerPage.editorTab.click();
  await expect(page).toHaveURL(/#\/markdown-composer\/editor$/);
  await expect(markdownComposerPage.editorTab).toHaveAttribute("aria-selected", "true");
  await expect(markdownComposerPage.heading("Markdown Editor")).toBeVisible();
});

test.describe("direct navigation", () => {
  for (const tabCase of TAB_CASES) {
    test(`loads the ${tabCase.tabName} tab`, async ({ page, markdownComposerPage }) => {
      // arrange & act
      await tabCase.navigate(markdownComposerPage);

      // assert
      await expect(page).toHaveURL(new RegExp(`#${tabCase.path.replace(/\//g, "\\/")}$`));
      await expect(markdownComposerPage.heading(tabCase.heading)).toBeVisible();
    });
  }
});
