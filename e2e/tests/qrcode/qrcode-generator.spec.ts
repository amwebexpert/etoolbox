import { expect, test } from "../../fixtures/pages.fixture";
import { clearQrcodePersistedStores } from "../../helpers/storage";

test.beforeEach(async ({ page, qrcodePage }) => {
  await qrcodePage.gotoGenerator();
  await clearQrcodePersistedStores(page);
  await page.reload();
});

test("generates a QR code from the seeded content and shows preview/HTML/data URL tabs", async ({ page }) => {
  // arrange
  const input = page.getByPlaceholder("Enter the text, URL, or data to encode in the QR code");
  await expect(input).toHaveValue("https://example.com");

  // act
  await page.getByRole("button", { name: "Generate" }).click();

  // assert — preview tab
  await expect(page.getByAltText("Generated QR Code")).toBeVisible();

  // act & assert — HTML tag tab
  await page.getByRole("tab", { name: "HTML Tag" }).click();
  await expect(page.getByText("Copy this HTML img tag to embed the QR code:")).toBeVisible();

  // act & assert — data URL tab
  await page.getByRole("tab", { name: "Data URL" }).click();
  await expect(page.getByText("Base64 encoded data URL (use as src attribute):")).toBeVisible();
});

test("clearing the content disables Generate and Clear becomes available again after typing", async ({ page }) => {
  // arrange
  const input = page.getByPlaceholder("Enter the text, URL, or data to encode in the QR code");
  const generateButton = page.getByRole("button", { name: "Generate" });
  const clearButton = page.getByRole("button", { name: "Clear" });
  await expect(generateButton).toBeEnabled();
  await expect(clearButton).toBeEnabled();

  // act
  await input.fill("");

  // assert
  await expect(generateButton).toBeDisabled();
  await expect(clearButton).toBeDisabled();
});

test("Copy URL, Copy Image and Download are disabled until a QR code is generated", async ({ page }) => {
  // assert — before generating
  await expect(page.getByRole("button", { name: "Copy URL" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Copy Image" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Download" })).toBeDisabled();

  // act
  await page.getByRole("button", { name: "Generate" }).click();

  // assert — after generating
  await expect(page.getByRole("button", { name: "Copy URL" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Copy Image" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Download" })).toBeEnabled();
});

test("advanced options collapse reveals the error correction and image format settings", async ({ page }) => {
  // act
  await page.getByText("Advanced Options").click();

  // assert
  await expect(page.getByText("Error Correction", { exact: true })).toBeVisible();
  await expect(page.getByText("Image Format", { exact: true })).toBeVisible();
});
