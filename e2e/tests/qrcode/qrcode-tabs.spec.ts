import { expect, test } from "../../fixtures/pages.fixture";

test.beforeEach(async ({ qrcodePage }) => {
  await qrcodePage.gotoGenerator();
});

test("qrcode index redirects to the generator tab", async ({ page, qrcodePage }) => {
  // arrange & act
  await page.goto("/#/qrcode");

  // assert
  await expect(page).toHaveURL(/#\/qrcode\/generator$/);
  await expect(qrcodePage.generatorTab).toHaveAttribute("aria-selected", "true");
  await expect(qrcodePage.heading("QR Code Generator")).toBeVisible();
});

test("can navigate between the Generator and Decoder tabs", async ({ page, qrcodePage }) => {
  // arrange
  await qrcodePage.gotoGenerator();
  await expect(qrcodePage.heading("QR Code Generator")).toBeVisible();

  // act & assert — decoder
  await qrcodePage.decoderTab.click();
  await expect(page).toHaveURL(/#\/qrcode\/decoder$/);
  await expect(qrcodePage.decoderTab).toHaveAttribute("aria-selected", "true");
  await expect(qrcodePage.heading("QR Code Decoder")).toBeVisible();

  // act & assert — back to generator
  await qrcodePage.generatorTab.click();
  await expect(page).toHaveURL(/#\/qrcode\/generator$/);
  await expect(qrcodePage.generatorTab).toHaveAttribute("aria-selected", "true");
  await expect(qrcodePage.heading("QR Code Generator")).toBeVisible();
});

test.describe("direct navigation", () => {
  test("loads the Generator tab", async ({ page, qrcodePage }) => {
    // arrange & act
    await qrcodePage.gotoGenerator();

    // assert
    await expect(page).toHaveURL(/#\/qrcode\/generator$/);
    await expect(qrcodePage.heading("QR Code Generator")).toBeVisible();
  });

  test("loads the Decoder tab", async ({ page, qrcodePage }) => {
    // arrange & act
    await qrcodePage.gotoDecoder();

    // assert
    await expect(page).toHaveURL(/#\/qrcode\/decoder$/);
    await expect(qrcodePage.heading("QR Code Decoder")).toBeVisible();
  });
});
