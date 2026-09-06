import { expect, test } from "../../fixtures/pages.fixture";
import { clearCommonListsPersistedStores } from "../../helpers/storage";

const parseCount = (text: string): number => Number(text.split("/")[0]?.trim());

test.beforeEach(async ({ page, commonListsPage }) => {
  await commonListsPage.gotoHtmlEntities();
  await clearCommonListsPersistedStores(page);
  await page.reload();
});

test("category select filters the table to fewer rows", async ({ page }) => {
  // arrange
  const countText = page.getByText(/^\d+ \/ \d+$/);
  const initialCount = parseCount(await countText.innerText());

  // act
  await page.getByRole("combobox").first().click();
  await page.locator(".ant-select-item-option").filter({ hasText: "Greek letters" }).click();

  // assert
  await expect(async () => {
    expect(parseCount(await countText.innerText())).toBeLessThan(initialCount);
  }).toPass();
});

test("search input filters the table by text", async ({ page }) => {
  // arrange
  const searchInput = page.getByPlaceholder("Search entity, name, number...");
  const countText = page.getByText(/^\d+ \/ \d+$/);
  const initialCount = parseCount(await countText.innerText());

  // act
  await searchInput.fill("copyright");

  // assert
  await expect(async () => {
    expect(parseCount(await countText.innerText())).toBeLessThan(initialCount);
  }).toPass();
  await expect(page.getByText(/copyright/i).first()).toBeVisible();
});

test("clear button resets category and search", async ({ page }) => {
  // arrange
  const searchInput = page.getByPlaceholder("Search entity, name, number...");
  const clearButton = page.getByRole("button", { name: "Clear" });
  const countText = page.getByText(/^\d+ \/ \d+$/);
  const initialCount = parseCount(await countText.innerText());

  // assert — disabled with no filters
  await expect(clearButton).toBeDisabled();

  // act
  await searchInput.fill("copyright");
  await expect(clearButton).toBeEnabled();
  await clearButton.click();

  // assert
  await expect(searchInput).toHaveValue("");
  await expect(clearButton).toBeDisabled();
  await expect(async () => {
    expect(parseCount(await countText.innerText())).toBe(initialCount);
  }).toPass();
});
