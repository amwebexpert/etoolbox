import { expect, test } from "../../fixtures/pages.fixture";
import { clearBase64PersistedStores } from "../../helpers/storage";

const SEEDED_TEXT = "Chuck Norris can encode and decode Base64 with his mind.";

test.beforeEach(async ({ page, base64Page }) => {
  await base64Page.gotoString();
  await clearBase64PersistedStores(page);
  await page.reload();
});

test("shows the seeded default text on first load", async ({ page }) => {
  // assert
  await expect(page.getByPlaceholder("Paste or type the text to encode/decode here")).toHaveValue(SEEDED_TEXT);
});

test("encodes text, swaps result into input, and decodes it back", async ({ page, base64Page }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type the text to encode/decode here");
  const encodeButton = page.getByRole("button", { name: "Encode" });
  const decodeButton = page.getByRole("button", { name: "Decode" });
  const swapButton = page.getByRole("button").filter({ has: page.getByRole("img", { name: "swap" }) });

  // act — encode
  await encodeButton.click();

  // assert — result section shows base64 output
  await expect(base64Page.resultSection("Result")).toBeVisible();
  const encoded = await base64Page.resultContent("Result").innerText();
  expect(encoded).not.toBe(SEEDED_TEXT);

  // act — swap result into input, then decode
  await swapButton.click();
  await expect(input).not.toHaveValue(SEEDED_TEXT);
  await decodeButton.click();

  // assert — decoded output matches the original seeded text
  await expect(base64Page.resultContent("Result")).toContainText(SEEDED_TEXT);
});

test("decoding an invalid base64 string shows an error", async ({ page, base64Page }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type the text to encode/decode here");

  // act
  await input.fill("not-valid-base64-!!!");
  await page.getByRole("button", { name: "Decode" }).click();

  // assert
  await expect(base64Page.resultContent("Result")).toContainText("Error: Invalid Base64 string");
});
