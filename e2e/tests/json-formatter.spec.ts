import { expect, test } from "../fixtures/pages.fixture";
import { clearJsonPersistedStores } from "../helpers/storage";

const SAMPLE_JSON = '{"name":"Chuck","active":true,"count":42}';

test.beforeEach(async ({ page, jsonPage }) => {
  await jsonPage.gotoFormatter();
  await clearJsonPersistedStores(page);
  await page.reload();
});

test("formats json input and supports minify and interactive view", async ({ page, jsonPage }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type the JSON content here");

  // act
  await input.fill(SAMPLE_JSON);

  // assert — formatted result with indentation
  await expect(jsonPage.resultSection("Formatted Result")).toBeVisible();
  await expect(jsonPage.resultContent("Formatted Result")).toContainText('"name": "Chuck"');
  await expect(page.getByRole("button", { name: "Minify" })).toBeEnabled();

  // act — minify
  await page.getByRole("button", { name: "Minify" }).click();

  // assert — compact output in result panel and format button available
  await expect(jsonPage.resultContent("Formatted Result")).toContainText('"name":"Chuck"');
  await expect(page.getByRole("button", { name: "Format" })).toBeEnabled();

  // act — restore formatting
  await page.getByRole("button", { name: "Format" }).click();
  await expect(jsonPage.resultContent("Formatted Result")).toContainText('"name": "Chuck"');

  // act — switch to interactive view
  await page.locator(".ant-segmented-item").filter({ hasText: "Interactive View" }).click();

  // assert — react-json-view renders parsed object inside result panel
  const interactiveResult = jsonPage.resultContent("Formatted Result").locator(".react-json-view");
  await expect(interactiveResult).toBeVisible();
  await expect(interactiveResult).toContainText("name");
  await expect(interactiveResult).toContainText("Chuck");
  await expect(interactiveResult).toContainText("active");
  await expect(interactiveResult).toContainText("42");
});

test("copy and save actions are enabled when formatted json is available", async ({ page, jsonPage }) => {
  // arrange
  await page.getByPlaceholder("Paste or type the JSON content here").fill(SAMPLE_JSON);

  // assert
  await expect(jsonPage.resultSection("Formatted Result")).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Save As…" })).toBeEnabled();
});
