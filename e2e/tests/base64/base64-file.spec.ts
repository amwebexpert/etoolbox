import { expect, test } from "../../fixtures/pages.fixture";

test.beforeEach(async ({ base64Page, page }) => {
  await base64Page.gotoFile();
  await page.reload();
});

test("uploads a file and shows its info", async ({ page }) => {
  // arrange
  const fileInput = page.locator('input[type="file"]');

  // act
  await fileInput.setInputFiles({
    name: "sample.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("hello base64 file test"),
  });

  // assert
  await expect(page.getByText(/File:/)).toBeVisible();
  await expect(page.getByText(/Type:/)).toBeVisible();
  await expect(page.getByText(/Size:/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy Base64" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Copy Data URI" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Download" })).toBeEnabled();
});

test("pasting base64 into the decode textarea shows a default file name and mime type", async ({ page }) => {
  // arrange
  const decodeTextArea = page.getByPlaceholder("Paste Base64 string here to decode back to a file");

  // act
  await decodeTextArea.fill("aGVsbG8gd29ybGQ=");

  // assert
  await expect(page.getByText(/File:\s*decoded-file/)).toBeVisible();
  await expect(page.getByText(/Type:\s*application\/octet-stream/)).toBeVisible();
});

test("clear resets the file, info panel and toolbar", async ({ page }) => {
  // arrange
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles({
    name: "sample.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("hello base64 file test"),
  });
  await expect(page.getByText(/File:/)).toBeVisible();

  // act
  await page.getByRole("button", { name: "Clear" }).click();

  // assert
  await expect(page.getByText(/File:/)).toBeHidden();
  await expect(page.getByRole("button", { name: "Copy Base64" })).toBeDisabled();
});
