import path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "../../fixtures/pages.fixture";
import { clearImageOcrPersistedStores } from "../../helpers/storage";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE_IMAGE_PATH = path.join(dirname, "../../fixtures/files/sample-image.png");

test.beforeEach(async ({ page, imageOcrPage }) => {
  await imageOcrPage.gotoCompressor();
  await clearImageOcrPersistedStores(page);
  await page.reload();
});

test("before an image is selected, only the upload area is visible", async ({ page }) => {
  // assert
  await expect(page.getByText("Click or drag an image here")).toBeVisible();
  await expect(page.getByRole("button", { name: "Compress" })).toBeHidden();
});

test("uploading an image enables Compress, compressing shows both preview panels", async ({ page }) => {
  // act — select a file
  await page.locator('input[type="file"]').setInputFiles(SAMPLE_IMAGE_PATH);

  // assert — toolbar appears, Compress enabled, Download not yet
  const compressButton = page.getByRole("button", { name: "Compress" }).last();
  const downloadButton = page.getByRole("button", { name: "Download" });
  await expect(compressButton).toBeEnabled();
  await expect(downloadButton).toBeDisabled();

  // act — compress
  await compressButton.click();

  // assert — both panels show size info, Download enabled
  await expect(page.getByText("Original", { exact: true })).toBeVisible();
  await expect(page.getByText("Compressed", { exact: true })).toBeVisible();
  await expect(downloadButton).toBeEnabled();
});

test("Clear resets back to the empty upload state", async ({ page }) => {
  // arrange
  await page.locator('input[type="file"]').setInputFiles(SAMPLE_IMAGE_PATH);
  await expect(page.getByRole("button", { name: "Clear" })).toBeVisible();

  // act
  await page.getByRole("button", { name: "Clear" }).click();

  // assert
  await expect(page.getByText("Click or drag an image here")).toBeVisible();
  await expect(page.getByRole("button", { name: "Compress" })).toBeHidden();
});
