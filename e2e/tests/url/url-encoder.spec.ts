import { expect, test } from "../../fixtures/pages.fixture";
import { clearUrlPersistedStores } from "../../helpers/storage";

const SEEDED_TEXT = "Chuck Norris can chuck more wood than a woodchuck could.";

test.beforeEach(async ({ page, urlPage }) => {
  await urlPage.gotoEncoder();
  await clearUrlPersistedStores(page);
  await page.reload();
});

test("shows the seeded default text on fresh load", async ({ page }) => {
  // assert
  await expect(page.getByPlaceholder("Paste or type the content to encode/decode here")).toHaveValue(SEEDED_TEXT);
});

test("encodes special characters then swaps and decodes back", async ({ page, urlPage }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type the content to encode/decode here");
  const swapButton = page.getByRole("button", { name: "swap" });
  const encodeButton = page.getByRole("button", { name: "Encode" });
  const decodeButton = page.getByRole("button", { name: "Decode" });

  // act — encode
  await input.fill("a b&c=d");
  await encodeButton.click();

  // assert
  await expect(urlPage.resultSection("Result")).toBeVisible();
  await expect(urlPage.resultContent("Result")).toContainText("a%20b%26c%3Dd");

  // act — swap moves the encoded result back into the input
  await swapButton.click();

  // assert
  await expect(input).toHaveValue("a%20b%26c%3Dd");

  // act — decode
  await decodeButton.click();

  // assert
  await expect(urlPage.resultContent("Result")).toContainText("a b&c=d");
});

test("decoding a malformed percent sequence returns it unchanged", async ({ page, urlPage }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type the content to encode/decode here");

  // act
  await input.fill("%");
  await page.getByRole("button", { name: "Decode" }).click();

  // assert
  await expect(urlPage.resultSection("Result")).toBeVisible();
  await expect(urlPage.resultContent("Result")).toContainText("%");
});
