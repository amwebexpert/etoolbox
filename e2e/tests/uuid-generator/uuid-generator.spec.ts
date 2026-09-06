import { expect, test } from "../../fixtures/pages.fixture";
import { clearUuidGeneratorPersistedStore } from "../../helpers/storage";

test.beforeEach(async ({ page, uuidGeneratorPage }) => {
  await uuidGeneratorPage.goto();
  await clearUuidGeneratorPersistedStore(page);
  await page.reload();
});

test("generates UUIDs with default settings", async ({ page }) => {
  // arrange
  const generateButton = page.getByRole("button", { name: "Generate" });

  // act
  await generateButton.click();

  // assert
  await expect(page.getByText("Generated UUIDs (5 UUIDs)")).toBeVisible();
  const textarea = page.getByRole("textbox").last();
  await expect(textarea).toHaveValue(/^([0-9a-f-]+\n){4}[0-9a-f-]+$/i);
});

test("changing version and quantity regenerates a different count", async ({ page }) => {
  // arrange
  await page.getByRole("combobox").first().click();
  await page.locator(".ant-select-item-option").filter({ hasText: /^v1 -/ }).click();
  await page.getByRole("spinbutton").fill("3");

  // act
  await page.getByRole("button", { name: "Generate" }).click();

  // assert
  await expect(page.getByText("Generated UUIDs (3 UUIDs)")).toBeVisible();
});

test("non-integer quantity shows a validation message", async ({ page }) => {
  // arrange
  const quantityInput = page.getByRole("spinbutton");

  // act — InputNumber clamps out-of-range values to min/max, but allows decimals through
  await quantityInput.fill("5.5");
  await quantityInput.blur();

  // assert
  await expect(page.getByText("Quantity must be a whole number")).toBeVisible();
});

test("clear and copy buttons are disabled until a result exists, enabled after generating", async ({ page }) => {
  // arrange
  const clearButton = page.getByRole("button", { name: "Clear" });
  const copyButton = page.getByRole("button", { name: "Copy" });

  // assert — initial state
  await expect(clearButton).toBeDisabled();
  await expect(copyButton).toBeDisabled();

  // act
  await page.getByRole("button", { name: "Generate" }).click();

  // assert — enabled after generating
  await expect(clearButton).toBeEnabled();
  await expect(copyButton).toBeEnabled();

  // act — clear resets to placeholder
  await clearButton.click();

  // assert
  await expect(page.getByText("Generated UUIDs will appear here")).toBeVisible();
  await expect(clearButton).toBeDisabled();
  await expect(copyButton).toBeDisabled();
});
