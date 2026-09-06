import { expect, test } from "../../fixtures/pages.fixture";
import { clearUrlPersistedStores } from "../../helpers/storage";

test.beforeEach(async ({ page, urlPage }) => {
  await urlPage.gotoParser();
  await clearUrlPersistedStores(page);
  await page.reload();
});

test("shows fragments and query parameters for the seeded default URL", async ({ page }) => {
  // assert — link to open the URL
  await expect(page.getByRole("link", { name: "Click the link to open the URL in a new tab" })).toBeVisible();

  // assert — URL Fragments table
  const fragmentsCard = page.locator(".ant-card").filter({ hasText: "URL Fragments" });
  await expect(fragmentsCard.getByRole("cell", { name: "codesandbox.io", exact: true })).toBeVisible();
  await expect(fragmentsCard.getByRole("cell", { name: "https:", exact: true })).toBeVisible();
  await expect(fragmentsCard.getByRole("cell", { name: "https://codesandbox.io" })).toBeVisible();
  await expect(fragmentsCard.getByRole("cell", { name: "/dashboard/home" })).toBeVisible();
  await expect(fragmentsCard.getByRole("cell", { name: "<default>" })).toBeVisible();
  await expect(fragmentsCard.getByRole("cell", { name: "?lastProject=WowWWW&name=Smith" })).toBeVisible();

  // assert — Query Parameters table
  const paramsCard = page.locator(".ant-card").filter({ hasText: "Query Parameters" });
  await expect(paramsCard.getByRole("cell", { name: "lastProject" })).toBeVisible();
  await expect(paramsCard.getByRole("cell", { name: "WowWWW" })).toBeVisible();
  await expect(paramsCard.getByRole("cell", { name: "name", exact: true })).toBeVisible();
  await expect(paramsCard.getByRole("cell", { name: "Smith" })).toBeVisible();
});

test("clearing the input empties fragments and hides query parameters", async ({ page }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type the URL here");

  // act
  await input.fill("");

  // assert
  await expect(page.getByText("Enter a valid URL to see fragments")).toBeVisible();
  await expect(page.getByText("Query Parameters")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Click the link to open the URL in a new tab" })).toHaveCount(0);
});

test("a URL with no query string shows fragments only", async ({ page }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type the URL here");

  // act
  await input.fill("https://example.com");

  // assert
  const fragmentsCard = page.locator(".ant-card").filter({ hasText: "URL Fragments" });
  await expect(fragmentsCard.getByRole("cell", { name: "example.com", exact: true })).toBeVisible();
  await expect(page.getByText("Query Parameters")).toHaveCount(0);
});
