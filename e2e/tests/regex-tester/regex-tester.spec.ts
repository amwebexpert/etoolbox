import { expect, test } from "../../fixtures/pages.fixture";
import { clearRegexTesterPersistedStore } from "../../helpers/storage";

test.beforeEach(async ({ page, regexTesterPage }) => {
  await regexTesterPage.goto();
  await clearRegexTesterPersistedStore(page);
  await page.reload();
});

test("shows highlighted matches and extracted values for the seeded default pattern", async ({
  page,
  regexTesterPage,
}) => {
  // arrange & act — fresh load already has the seeded default pattern/text applied

  // assert
  await expect(regexTesterPage.heading("Regular Expression Tester")).toBeVisible();
  await expect(regexTesterPage.resultSection("Matches Preview")).toBeVisible();
  await expect(page.getByText("1 match found")).toBeVisible();
  await expect(regexTesterPage.resultContent("Matches Preview")).toContainText("AC-1940");
  await expect(regexTesterPage.resultContent("Extracted Values")).toContainText("AC-1940");
  await expect(page.getByText("1 total, 1 unique")).toBeVisible();
});

test("shows an Error section for an invalid regex pattern", async ({ page, regexTesterPage }) => {
  // arrange
  const patternInput = page.getByPlaceholder("Type the pattern. Examples: /example/g or just example");

  // act
  await patternInput.fill("(");

  // assert
  await expect(regexTesterPage.resultSection("Error")).toBeVisible();
  await expect(regexTesterPage.resultContent("Error")).toContainText("Invalid regular expression");
});

test("toggling a flag changes the match results", async ({ page }) => {
  // arrange
  const patternInput = page.getByPlaceholder("Type the pattern. Examples: /example/g or just example");
  const testContent = page.getByPlaceholder("Paste or type the content to test the regular expression against");
  await patternInput.fill("abc");
  await testContent.fill("ABC abc");

  // assert — case-sensitive by default (only lowercase "abc" matches)
  await expect(page.getByText("1 match found")).toBeVisible();

  // act — enable case-insensitive flag
  await page.getByRole("checkbox", { name: "Case Insensitive (i)" }).check();

  // assert — now both "ABC" and "abc" match
  await expect(page.getByText("2 matches found")).toBeVisible();
});

test("Clear button resets pattern, content and flags to empty defaults", async ({ page }) => {
  // arrange
  const patternInput = page.getByPlaceholder("Type the pattern. Examples: /example/g or just example");
  const testContent = page.getByPlaceholder("Paste or type the content to test the regular expression against");
  await patternInput.fill("abc");
  await testContent.fill("abc");
  const clearButton = page.getByRole("button", { name: "Clear" });
  await expect(clearButton).toBeEnabled();

  // act
  await clearButton.click();

  // assert
  await expect(patternInput).toHaveValue("");
  await expect(testContent).toHaveValue("");
  await expect(clearButton).toBeDisabled();
  await expect(page.getByText("Matches will be highlighted here")).toBeVisible();
  await expect(page.getByText("Extracted values will appear here")).toBeVisible();
});
