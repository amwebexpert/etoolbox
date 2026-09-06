import { expect, test } from "../../fixtures/pages.fixture";
import { clearGithubUserProjectsPersistedStore } from "../../helpers/storage";

const GITHUB_REST_API_TIMEOUT_MS = 30_000;
test.setTimeout(GITHUB_REST_API_TIMEOUT_MS);

test.beforeEach(async ({ page, githubUserProjectsPage }) => {
  await githubUserProjectsPage.goto();
  await clearGithubUserProjectsPersistedStore(page);
  await page.reload();
});

test("shows the empty search state before any search is made", async ({ page }) => {
  // assert
  await expect(page.getByText("Search GitHub Repositories")).toBeVisible();
});

test("searching a real username shows the stats card and repository table", async ({ page }) => {
  // arrange
  const usernameInput = page.getByPlaceholder("Enter GitHub username...");

  // act
  await usernameInput.fill("octocat");
  await page.getByRole("button", { name: "Search" }).click();

  // assert
  await expect(page.getByText("Repositories", { exact: true })).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole("columnheader", { name: "Repository" })).toBeVisible();
  await expect(page.getByText(/of \d+ repositories/)).toBeVisible();
});

test("searching an unknown username shows a not-found message", async ({ page }) => {
  // arrange
  const usernameInput = page.getByPlaceholder("Enter GitHub username...");

  // act
  await usernameInput.fill("this-username-should-not-exist-e2e-9999");
  await page.getByRole("button", { name: "Search" }).click();

  // assert
  await expect(
    page.getByText('User "this-username-should-not-exist-e2e-9999" not found').first()
  ).toBeVisible({
    timeout: 15_000,
  });
});

test("filters row appears after a search and filters the table by text", async ({ page }) => {
  // arrange
  await page.getByPlaceholder("Enter GitHub username...").fill("octocat");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText(/of \d+ repositories/)).toBeVisible({ timeout: 15_000 });
  const filterInput = page.getByPlaceholder("Filter by name, description...");
  await expect(filterInput).toBeVisible();

  // act
  await filterInput.fill("Spoon-Knife");

  // assert
  await expect(page.getByText(/of 1 repositories/)).toBeVisible();
});
