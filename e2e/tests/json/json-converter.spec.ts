import { expect, test } from "../../fixtures/pages.fixture";
import { clearJsonPersistedStores } from "../../helpers/storage";

const SOURCE_JSON = '{ "firstName": "Chuck", "lastName": "Norris", "age": 880 }';

test.beforeEach(async ({ page, jsonPage }) => {
  await jsonPage.gotoConverter();
  await clearJsonPersistedStores(page);
  await page.reload();
});

test("converts json source to typescript", async ({ page, jsonPage }) => {
  // arrange
  await page.getByPlaceholder("e.g. MyClass").fill("Person");
  await page.getByPlaceholder("Paste or type the source JSON or JavaScript object here").fill(SOURCE_JSON);

  // act
  await page.getByRole("button", { name: "Convert" }).click();

  // assert
  await expect(jsonPage.resultSection("Converted Result")).toBeVisible();
  const convertedResult = jsonPage.resultContent("Converted Result");
  await expect(convertedResult).toContainText("export interface Person");
  await expect(convertedResult).toContainText("firstName");
  await expect(convertedResult).toContainText("lastName");
});

test("can convert to another target language and clear the form", async ({ page, jsonPage }) => {
  // arrange
  await page.getByPlaceholder("e.g. MyClass").fill("Person");
  await page.getByPlaceholder("Paste or type the source JSON or JavaScript object here").fill(SOURCE_JSON);

  await page.getByRole("combobox").nth(1).click();
  await page.getByTitle("Python").click();

  // act
  await page.getByRole("button", { name: "Convert" }).click();

  // assert — python-style output
  await expect(jsonPage.resultSection("Converted Result")).toBeVisible();
  await expect(jsonPage.resultContent("Converted Result")).toContainText("class Person");

  // act — clear
  await page.getByRole("button", { name: "Clear" }).click();

  // assert — source cleared, result placeholder restored
  await expect(page.getByPlaceholder("Paste or type the source JSON or JavaScript object here")).toHaveValue("");
  await expect(page.getByText("Converted result will appear here")).toBeVisible();
});

test("convert button stays disabled until required fields are filled", async ({ page }) => {
  // arrange
  await page.getByPlaceholder("e.g. MyClass").fill("");
  await page.getByPlaceholder("Paste or type the source JSON or JavaScript object here").fill("");

  // assert
  await expect(page.getByRole("button", { name: "Convert" })).toBeDisabled();
});
