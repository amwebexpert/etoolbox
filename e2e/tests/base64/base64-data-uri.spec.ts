import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "../../fixtures/pages.fixture";
import { clearBase64PersistedStores } from "../../helpers/storage";

const currentDir = dirname(fileURLToPath(import.meta.url));
const SAMPLE_IMAGE_BASE64 = readFileSync(join(currentDir, "../../fixtures/files/sample-image.png")).toString(
  "base64"
);
const IMAGE_DATA_URI = `data:image/png;base64,${SAMPLE_IMAGE_BASE64}`;
const NON_IMAGE_DATA_URI = "data:text/plain;base64,aGVsbG8gd29ybGQ=";

test.beforeEach(async ({ page, base64Page }) => {
  await base64Page.gotoDataUri();
  await clearBase64PersistedStores(page);
  await page.reload();
});

test("previews a valid image data uri with its metadata", async ({ page }) => {
  // arrange
  const input = page.getByPlaceholder("Paste a Base64 data URI here");

  // act
  await input.fill(IMAGE_DATA_URI);

  // assert
  await expect(page.getByAltText("Decoded preview")).toBeVisible();
  await expect(page.getByText("Resolution")).toBeVisible();
  await expect(page.getByText("MIME type")).toBeVisible();
  await expect(page.getByText("image/png", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Download" })).toBeEnabled();
});

test("shows an open-in-new-tab alert for a non-image data uri", async ({ page }) => {
  // arrange
  const input = page.getByPlaceholder("Paste a Base64 data URI here");

  // act
  await input.fill(NON_IMAGE_DATA_URI);

  // assert
  await expect(page.getByAltText("Decoded preview")).toBeHidden();
  await expect(page.getByRole("link", { name: "Open in new tab" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Download" })).toBeDisabled();
});

test("clear resets the input and hides the preview", async ({ page }) => {
  // arrange
  const input = page.getByPlaceholder("Paste a Base64 data URI here");
  await input.fill(IMAGE_DATA_URI);
  await expect(page.getByAltText("Decoded preview")).toBeVisible();

  // act
  await page.getByRole("button", { name: "Clear" }).click();

  // assert
  await expect(input).toHaveValue("");
  await expect(page.getByAltText("Decoded preview")).toBeHidden();
});
