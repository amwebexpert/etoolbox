import path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "../../fixtures/pages.fixture";
import { clearColorsPersistedStores } from "../../helpers/storage";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE_IMAGE_PATH = path.join(dirname, "../../fixtures/files/sample-image.png");

test.beforeEach(async ({ page, colorsPage }) => {
  await colorsPage.gotoPicker();
  await clearColorsPersistedStores(page);
  await page.reload();
});

test("uploading an image renders it and enables Clear, clearing removes it again", async ({ page }) => {
  // arrange
  const clearButton = page.getByRole("button", { name: "Clear" });
  const sourceImage = page.getByAltText("Source for color picking");

  // assert — no image yet
  await expect(page.getByText("Paste an image (Ctrl+V / Cmd+V) or select a file")).toBeVisible();
  await expect(clearButton).toBeDisabled();

  // act — upload a file
  await page.locator('input[type="file"]').setInputFiles(SAMPLE_IMAGE_PATH);

  // assert — image renders and Clear is enabled
  await expect(sourceImage).toBeVisible();
  await expect(clearButton).toBeEnabled();

  // act — clear
  await clearButton.click();

  // assert — back to the empty placeholder, Clear disabled again
  await expect(page.getByText("Paste an image (Ctrl+V / Cmd+V) or select a file")).toBeVisible();
  await expect(clearButton).toBeDisabled();
});

test("clicking a color format card copies its value", async ({ page }) => {
  // arrange
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

  // assert — default color format cards are visible
  await expect(page.getByText("#3b82f6", { exact: true })).toBeVisible();
  await expect(page.getByText("#3b82f6ff", { exact: true })).toBeVisible();
  await expect(page.getByText("rgb(59, 130, 246)", { exact: true })).toBeVisible();
  await expect(page.getByText("rgba(59, 130, 246, 1)", { exact: true })).toBeVisible();

  // act — click the HEX card
  await page.getByText("#3b82f6", { exact: true }).click();

  // assert — toast confirms the copy
  await expect(page.getByText("Copied: #3b82f6", { exact: true })).toBeVisible();
});
