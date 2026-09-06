import { expect, test } from "../../fixtures/pages.fixture";
import { clearCommonListsPersistedStores } from "../../helpers/storage";

const parseCount = (text: string): number => Number(text.split("/")[0]?.trim());

test.beforeEach(async ({ page, commonListsPage }) => {
  await commonListsPage.gotoHttpHeaders();
  await clearCommonListsPersistedStores(page);
  await page.reload();
});

test("category and type selects filter the table to fewer rows", async ({ page }) => {
  // arrange
  const countText = page.getByText(/^\d+ \/ \d+$/);
  const initialCount = parseCount(await countText.innerText());

  // act
  await page.getByRole("combobox").first().click();
  await page.locator(".ant-select-item-option").filter({ hasText: "Authentication" }).click();

  // assert
  await expect(async () => {
    expect(parseCount(await countText.innerText())).toBeLessThan(initialCount);
  }).toPass();
});

test("search input filters the table by text", async ({ page }) => {
  // arrange
  const searchInput = page.getByPlaceholder("Search header name or description...");
  const countText = page.getByText(/^\d+ \/ \d+$/);
  const initialCount = parseCount(await countText.innerText());

  // act
  await searchInput.fill("Authorization");

  // assert
  await expect(async () => {
    expect(parseCount(await countText.innerText())).toBeLessThan(initialCount);
  }).toPass();
  await expect(page.getByText(/Authorization/).first()).toBeVisible();
});

test("clear filters resets category, type and search", async ({ page }) => {
  // arrange
  const searchInput = page.getByPlaceholder("Search header name or description...");
  const clearButton = page.getByRole("button", { name: "Clear filters" });
  const countText = page.getByText(/^\d+ \/ \d+$/);
  const initialCount = parseCount(await countText.innerText());

  // assert — disabled with no filters
  await expect(clearButton).toBeDisabled();

  // act
  await searchInput.fill("Authorization");
  await expect(clearButton).toBeEnabled();
  await clearButton.click();

  // assert
  await expect(searchInput).toHaveValue("");
  await expect(clearButton).toBeDisabled();
  await expect(async () => {
    expect(parseCount(await countText.innerText())).toBe(initialCount);
  }).toPass();
});
