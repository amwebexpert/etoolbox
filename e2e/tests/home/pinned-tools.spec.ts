import { expect, test } from "../../fixtures/pages.fixture";
import { clearPinnedToolsPersistedStore } from "../../helpers/storage";

test.beforeEach(async ({ page, homePage }) => {
  await homePage.goto();
  await clearPinnedToolsPersistedStore(page);
  await page.reload();
});

test("pinning a tool from Home surfaces it on Home and the sidebar, and search filters the grid", async ({
  page,
  homePage,
}) => {
  // arrange: nothing pinned yet
  await expect(homePage.gridCard("JSON Suite")).toBeVisible();
  await expect(homePage.pinnedHeading).toHaveCount(0);

  // act: pin the JSON tool from its Home card
  await homePage.pinButton("JSON Suite").click();

  // assert: Home shows a Pinned section containing the tool
  await expect(homePage.pinnedHeading).toBeVisible();

  // assert: sidebar shows the tool once (pinned group only, no duplicate row below)
  await expect(homePage.sidebar.getByText("Pinned", { exact: true })).toBeVisible();
  await expect(homePage.sidebarLink("JSON Suite")).toHaveCount(1);

  // assert: the pin survives a reload
  await page.reload();
  await expect(homePage.pinnedHeading).toBeVisible();
  await expect(homePage.sidebarLink("JSON Suite")).toHaveCount(1);

  // act: search filters the grid down to matches only
  await homePage.searchInput.fill("json");
  await expect(homePage.gridCard("Base64")).toHaveCount(0);
  await expect(homePage.gridCard("JSON Suite").first()).toBeVisible();

  // act: clearing the query recovers the full grid
  await homePage.searchInput.fill("");
  await expect(homePage.gridCard("Base64")).toBeVisible();
});
