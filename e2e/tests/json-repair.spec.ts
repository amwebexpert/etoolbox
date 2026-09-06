import { expect,test } from "../fixtures/pages.fixture";
import { clearJsonPersistedStores } from "../helpers/storage";

const MALFORMED_JSON = '{name: "Chuck", active: true,}';

test.beforeEach(async ({ page, jsonPage }) => {
  await jsonPage.gotoRepair();
  await clearJsonPersistedStores(page);
  await page.reload();
});

test("repairs malformed json input", async ({ page, jsonPage }) => {
  // arrange
  await page.getByPlaceholder("Paste or type the malformed JSON content here").fill(MALFORMED_JSON);

  // act
  await page.getByRole("button", { name: "Repair" }).click();

  // assert
  await expect(jsonPage.resultSection("Repaired Result")).toBeVisible();
  const repairedResult = jsonPage.resultContent("Repaired Result");
  await expect(repairedResult).toContainText('"name": "Chuck"');
  await expect(repairedResult).toContainText('"active": true');
  await expect(page.getByRole("button", { name: "Copy" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Save As…" })).toBeEnabled();
});

test("clear resets input and result", async ({ page, jsonPage }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type the malformed JSON content here");
  await input.fill(MALFORMED_JSON);
  await page.getByRole("button", { name: "Repair" }).click();
  await expect(jsonPage.resultSection("Repaired Result")).toBeVisible();

  // act
  await page.getByRole("button", { name: "Clear" }).click();

  // assert
  await expect(input).toHaveValue("");
  await expect(page.getByText("Repaired JSON will appear here")).toBeVisible();
  await expect(page.getByRole("button", { name: "Repair" })).toBeDisabled();
});

test("repair button stays disabled with empty input", async ({ page }) => {
  // assert
  await expect(page.getByRole("button", { name: "Repair" })).toBeDisabled();
});
