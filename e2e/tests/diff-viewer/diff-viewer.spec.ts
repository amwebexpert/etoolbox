import { expect, test } from "../../fixtures/pages.fixture";
import { clearDiffViewerPersistedStore } from "../../helpers/storage";

test.beforeEach(async ({ page, diffViewerPage }) => {
  await diffViewerPage.goto();
  await clearDiffViewerPersistedStore(page);
  await page.reload();
});

test("typing different texts renders the diff view and updates the summary counts", async ({
  page,
  diffViewerPage,
}) => {
  // arrange
  await expect(diffViewerPage.heading("Diff Viewer")).toBeVisible();
  const original = page.getByRole("textbox", { name: "Original" });
  const modified = page.getByRole("textbox", { name: "Modified" });

  // act
  await original.fill("line one\nline two\nline three");
  await modified.fill("line one\nline two changed\nline three\nline four");

  // assert
  const summary = page.getByLabel("Diff summary");
  await expect(summary).toContainText(/\+\d+ lines/);
  await expect(summary).toContainText(/−\d+ lines/);
  await expect(summary).not.toContainText("+0 lines");
  await expect(page.getByText("line one").first()).toBeVisible();
});

test("identical texts show zero added and removed lines", async ({ page, diffViewerPage }) => {
  // arrange
  await diffViewerPage.goto();
  const sameText = "identical content\nsecond line";

  // act
  await page.getByRole("textbox", { name: "Original" }).fill(sameText);
  await page.getByRole("textbox", { name: "Modified" }).fill(sameText);

  // assert
  const summary = page.getByLabel("Diff summary");
  await expect(summary).toContainText("+0 lines");
  await expect(summary).toContainText("−0 lines");
});

test("ignore whitespace toggle changes whether a whitespace-only diff counts", async ({ page }) => {
  // arrange
  await page.getByRole("textbox", { name: "Original" }).fill("hello world");
  await page.getByRole("textbox", { name: "Modified" }).fill("  hello world  ");
  const summary = page.getByLabel("Diff summary");
  await expect(summary).not.toContainText("+0 lines");

  // act
  await page.getByRole("checkbox", { name: "Ignore whitespace" }).check();

  // assert
  await expect(summary).toContainText("+0 lines");
  await expect(summary).toContainText("−0 lines");
});

test("swap button swaps original and modified content", async ({ page }) => {
  // arrange
  await page.getByRole("textbox", { name: "Original" }).fill("original content");
  await page.getByRole("textbox", { name: "Modified" }).fill("modified content");

  // act
  await page.getByRole("button", { name: "Swap original and modified" }).click();

  // assert
  await expect(page.getByRole("textbox", { name: "Original" })).toHaveValue("modified content");
  await expect(page.getByRole("textbox", { name: "Modified" })).toHaveValue("original content");
});
