import path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "../../fixtures/pages.fixture";
import { clearCsvParserPersistedStore } from "../../helpers/storage";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE_CSV_PATH = path.join(dirname, "../../fixtures/files/sample.csv");

const SAMPLE_CSV = "name,age,city\nAlice,30,Montreal\nBob,25,Toronto\nCharlie,35,Vancouver";

test.beforeEach(async ({ page, csvParserPage }) => {
  await csvParserPage.goto();
  await clearCsvParserPersistedStore(page);
  await page.reload();
});

test("parses pasted CSV and shows stats and JSON result", async ({ page, csvParserPage }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type your CSV data here, or upload a file above");

  // act
  await input.fill(SAMPLE_CSV);
  await page.getByRole("button", { name: "Parse" }).click();

  // assert — stats
  await expect(page.getByText("Rows", { exact: true })).toBeVisible();
  await expect(page.getByText("3", { exact: true }).first()).toBeVisible();

  // assert — JSON result contains the parsed data
  await expect(csvParserPage.resultSection("Parsed Data (JSON)")).toBeVisible();
  await expect(csvParserPage.resultContent("Parsed Data (JSON)")).toContainText("Alice");
  await expect(csvParserPage.resultContent("Parsed Data (JSON)")).toContainText("Montreal");
});

test("switching to Table view shows a table with the parsed columns", async ({ page, csvParserPage }) => {
  // arrange
  await page.getByPlaceholder("Paste or type your CSV data here, or upload a file above").fill(SAMPLE_CSV);
  await page.getByRole("button", { name: "Parse" }).click();
  await expect(csvParserPage.resultSection("Parsed Data (JSON)")).toBeVisible();

  // act
  await page.locator(".ant-segmented-item").filter({ hasText: "Table" }).click();

  // assert
  await expect(csvParserPage.resultSection("Parsed Data (3 rows)")).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "name" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "age" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "city" })).toBeVisible();
});

test("uploading a CSV file populates the source textarea", async ({ page }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type your CSV data here, or upload a file above");
  await expect(input).toHaveValue("");

  // act
  await page.locator('input[type="file"]').setInputFiles(SAMPLE_CSV_PATH);

  // assert
  await expect(input).toHaveValue(/Alice,30,Montreal/);
  await expect(page.getByText(/sample\.csv/)).toBeVisible();
});

test("Parse button is disabled until content exists", async ({ page }) => {
  // assert
  await expect(page.getByRole("button", { name: "Parse" })).toBeDisabled();
});

test("Clear resets the textarea and result to the empty placeholder", async ({ page }) => {
  // arrange
  await page.getByPlaceholder("Paste or type your CSV data here, or upload a file above").fill(SAMPLE_CSV);
  await page.getByRole("button", { name: "Parse" }).click();
  await expect(page.getByText("Parsed result will appear here")).toBeHidden();

  // act
  await page.getByRole("button", { name: "Clear" }).click();

  // assert
  await expect(page.getByPlaceholder("Paste or type your CSV data here, or upload a file above")).toHaveValue("");
  await expect(page.getByText("Parsed result will appear here")).toBeVisible();
});
