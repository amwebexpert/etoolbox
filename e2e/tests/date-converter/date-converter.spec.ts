import { expect, test } from "../../fixtures/pages.fixture";
import { clearDateConverterPersistedStore } from "../../helpers/storage";

test.beforeEach(async ({ page, dateConverterPage }) => {
  await dateConverterPage.goto();
  await clearDateConverterPersistedStore(page);
  await page.reload();
});

test("clicking Now populates the result table with date formats", async ({ page, dateConverterPage }) => {
  // arrange
  await expect(page.getByText('Enter an epoch value or click "Now" to see date conversions')).toBeVisible();

  // act
  await page.getByRole("button", { name: "Now" }).click();

  // assert — labels render as table cells (desktop) or cards (mobile)
  await expect(dateConverterPage.heading("Date & Epoch Converter")).toBeVisible();
  await expect(page.getByText("ISO 8601 / JSON", { exact: true })).toBeVisible();
  await expect(page.getByText("Epoch (milliseconds)", { exact: true })).toBeVisible();
  await expect(page.getByText("UTC String", { exact: true })).toBeVisible();
});

test("non-numeric epoch value shows a validation error", async ({ page }) => {
  // arrange
  const epochInput = page.getByPlaceholder("Enter epoch timestamp");

  // act
  await epochInput.fill("not-a-number");

  // assert
  await expect(page.getByText("Must be a valid number")).toBeVisible();
});

test("quick dates sets the start of day", async ({ page }) => {
  // arrange & act
  await page.getByRole("button", { name: "Quick Dates" }).click();
  await page.getByRole("menuitem", { name: "Start of Day (00:00)" }).click();

  // assert
  await expect(page.getByText("Time Only (HH:mm:ss)", { exact: true })).toBeVisible();
  const epochInput = page.getByPlaceholder("Enter epoch timestamp");
  await expect(epochInput).not.toHaveValue("");
});

test("toggling code examples hides the code examples section", async ({ page }) => {
  // arrange
  await page.getByRole("button", { name: "Now" }).click();
  await expect(page.getByRole("heading", { name: "Code Examples" })).toBeVisible();

  // act
  await page.getByRole("switch").click();

  // assert
  await expect(page.getByRole("heading", { name: "Code Examples" })).not.toBeVisible();
});

test("clear resets to the empty placeholder", async ({ page }) => {
  // arrange
  await page.getByRole("button", { name: "Now" }).click();
  await expect(page.getByText("ISO 8601 / JSON", { exact: true })).toBeVisible();

  // act
  await page.getByRole("button", { name: "Clear" }).click();

  // assert
  await expect(page.getByText('Enter an epoch value or click "Now" to see date conversions')).toBeVisible();
  await expect(page.getByRole("button", { name: "Clear" })).toBeDisabled();
});
