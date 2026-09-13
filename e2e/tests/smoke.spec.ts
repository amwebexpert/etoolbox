import { expect,test } from "../fixtures/pages.fixture";

test("app loads and renders the home page", async ({ page }) => {
  // arrange & act
  await page.goto("/#/");

  // assert
  await expect(page).toHaveTitle("Web Toolbox");
  await expect(page.getByText("Web Toolbox", { exact: true })).toBeVisible();
  await expect(page.getByRole("main").getByText("JSON Suite", { exact: true })).toBeVisible();
});
