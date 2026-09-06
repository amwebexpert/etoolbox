import { expect, test } from "../../fixtures/pages.fixture";

test.beforeEach(async ({ imageOcrPage }) => {
  await imageOcrPage.gotoOcr();
});

test("image-ocr index redirects to the OCR tab", async ({ page, imageOcrPage }) => {
  // arrange & act
  await page.goto("/#/image-ocr");

  // assert
  await expect(page).toHaveURL(/#\/image-ocr\/ocr$/);
  await expect(imageOcrPage.ocrTab).toHaveAttribute("aria-selected", "true");
  await expect(imageOcrPage.heading("Image OCR")).toBeVisible();
});

test("can navigate between the OCR and Compressor tabs", async ({ page, imageOcrPage }) => {
  // arrange
  await imageOcrPage.gotoOcr();
  await expect(imageOcrPage.heading("Image OCR")).toBeVisible();

  // act & assert — compressor
  await imageOcrPage.compressorTab.click();
  await expect(page).toHaveURL(/#\/image-ocr\/compressor$/);
  await expect(imageOcrPage.compressorTab).toHaveAttribute("aria-selected", "true");
  await expect(imageOcrPage.heading("Image Compressor")).toBeVisible();

  // act & assert — back to OCR
  await imageOcrPage.ocrTab.click();
  await expect(page).toHaveURL(/#\/image-ocr\/ocr$/);
  await expect(imageOcrPage.ocrTab).toHaveAttribute("aria-selected", "true");
  await expect(imageOcrPage.heading("Image OCR")).toBeVisible();
});

test.describe("direct navigation", () => {
  test("loads the OCR tab", async ({ page, imageOcrPage }) => {
    // arrange & act
    await imageOcrPage.gotoOcr();

    // assert
    await expect(page).toHaveURL(/#\/image-ocr\/ocr$/);
    await expect(imageOcrPage.heading("Image OCR")).toBeVisible();
  });

  test("loads the Compressor tab", async ({ page, imageOcrPage }) => {
    // arrange & act
    await imageOcrPage.gotoCompressor();

    // assert
    await expect(page).toHaveURL(/#\/image-ocr\/compressor$/);
    await expect(imageOcrPage.heading("Image Compressor")).toBeVisible();
  });
});
