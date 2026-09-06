import path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "../../fixtures/pages.fixture";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE_QRCODE_PATH = path.join(dirname, "../../fixtures/files/sample-qrcode.png");
const SAMPLE_IMAGE_PATH = path.join(dirname, "../../fixtures/files/sample-image.png");

test.beforeEach(async ({ qrcodePage }) => {
  await qrcodePage.gotoDecoder();
});

test("decodes a QR code image and shows the decoded text, details and JSON tabs", async ({ page }) => {
  // arrange
  await page.locator('input[type="file"]').setInputFiles(SAMPLE_QRCODE_PATH);

  // act
  await page.getByRole("button", { name: "Decode" }).click();

  // assert — decoded text tab
  await expect(page.getByText("E2E-TEST-QR-CONTENT")).toBeVisible();

  // act & assert — details tab
  await page.getByRole("tab", { name: "Details" }).click();
  await expect(page.getByText("QR_CODE")).toBeVisible();

  // act & assert — JSON tab
  await page.getByRole("tab", { name: "JSON" }).click();
  await expect(page.getByText('"format": "QR_CODE"')).toBeVisible();
});

test("uploading an image without a QR code shows a decoding-failed toast", async ({ page }) => {
  // arrange
  await page.locator('input[type="file"]').setInputFiles(SAMPLE_IMAGE_PATH);

  // act
  await page.getByRole("button", { name: "Decode" }).click();

  // assert
  await expect(page.getByText("Decoding failed: Failed to decode QR code: No QR code found in the image")).toBeVisible();
});

test("Decode and Copy Result are disabled until an image is selected / decoded", async ({ page }) => {
  // assert — before selecting an image
  await expect(page.getByRole("button", { name: "Decode" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Copy Result" })).toBeDisabled();

  // act
  await page.locator('input[type="file"]').setInputFiles(SAMPLE_QRCODE_PATH);

  // assert — image selected, decode enabled, copy still disabled
  await expect(page.getByRole("button", { name: "Decode" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Copy Result" })).toBeDisabled();

  // act
  await page.getByRole("button", { name: "Decode" }).click();

  // assert — copy enabled after a successful decode
  await expect(page.getByRole("button", { name: "Copy Result" })).toBeEnabled();
});
