import path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "../../fixtures/pages.fixture";
import { clearImageOcrPersistedStores } from "../../helpers/storage";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE_OCR_IMAGE_PATH = path.join(dirname, "../../fixtures/files/sample-ocr-text.png");

const TESSERACT_WASM_AND_TRAINING_DATA_DOWNLOAD_TIMEOUT_MS = 120_000;
test.setTimeout(TESSERACT_WASM_AND_TRAINING_DATA_DOWNLOAD_TIMEOUT_MS);

test.beforeEach(async ({ page, imageOcrPage }) => {
  await imageOcrPage.gotoOcr();
  await clearImageOcrPersistedStores(page);
  await page.reload();
});

test("runs OCR on an uploaded image and extracts the printed text", async ({ page }) => {
  // arrange
  await page.locator('input[type="file"]').setInputFiles(SAMPLE_OCR_IMAGE_PATH);
  await expect(page.getByRole("button", { name: "Run OCR" })).toBeEnabled();

  // act
  await page.getByRole("button", { name: "Run OCR" }).click();

  // assert — stats and extracted text appear once processing completes
  await expect(page.getByText("Words", { exact: true })).toBeVisible({ timeout: 100_000 });
  await expect(page.getByText("Extracted Text", { exact: true })).toBeVisible();
  await expect(page.getByText(/HELLO/i)).toBeVisible();
  await expect(page.getByText(/WORLD/i)).toBeVisible();
});

test("Run OCR is disabled until an image is selected", async ({ page }) => {
  // assert
  await expect(page.getByRole("button", { name: "Run OCR" })).toBeDisabled();
});
