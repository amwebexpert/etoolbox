import { expect, test } from "../../fixtures/pages.fixture";
import { clearColorsPersistedStores } from "../../helpers/storage";

test.beforeEach(async ({ page, colorsPage }) => {
  await colorsPage.gotoNamed();
  await clearColorsPersistedStores(page);
  await page.reload();
});

test("family select filters the table to fewer rows", async ({ page }) => {
  // arrange
  await expect(page.getByText(/of \d+ colors/)).toBeVisible();

  // act — filter to the Blue family
  await page.getByRole("combobox").first().click();
  await page.locator(".ant-select-item-option").filter({ hasText: "Blue" }).first().click();

  // assert — total count reduced to the 15 blue entries
  await expect(page.getByText("1-5 of 15 colors", { exact: true })).toBeVisible();
});

test("search input filters the table by text", async ({ page }) => {
  // arrange
  const searchInput = page.getByPlaceholder("Search by name, RGB, or HEX...");

  // act
  await searchInput.fill("Crimson");

  // assert — a single matching row
  await expect(page.getByText("1-1 of 1 colors", { exact: true })).toBeVisible();
  await expect(page.getByText("Crimson", { exact: true })).toBeVisible();
});

test("clear filters resets family and search", async ({ page }) => {
  // arrange
  const clearFiltersButton = page.getByRole("button", { name: "Clear filters" });
  const searchInput = page.getByPlaceholder("Search by name, RGB, or HEX...");
  await expect(clearFiltersButton).toBeDisabled();

  // act — apply a filter
  await searchInput.fill("Crimson");
  await expect(clearFiltersButton).toBeEnabled();

  // act — clear it
  await clearFiltersButton.click();

  // assert — filter cleared, button disabled again
  await expect(searchInput).toHaveValue("");
  await expect(clearFiltersButton).toBeDisabled();
});
