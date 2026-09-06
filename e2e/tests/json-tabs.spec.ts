import { expect,test } from "../fixtures/pages.fixture";
import { clearJsonPersistedStores } from "../helpers/storage";
import type { JsonPage } from "../pages/json-page";

const TAB_CASES: Array<{
  tabName: string;
  path: string;
  heading: string;
  navigate: (jsonPage: JsonPage) => Promise<void>;
}> = [
  {
    tabName: "Formatter",
    path: "/json/formatter",
    heading: "JSON Formatter",
    navigate: (jsonPage) => jsonPage.gotoFormatter(),
  },
  {
    tabName: "Converter",
    path: "/json/converter",
    heading: "JSON Converter",
    navigate: (jsonPage) => jsonPage.gotoConverter(),
  },
  {
    tabName: "Repair",
    path: "/json/repair",
    heading: "JSON Repair",
    navigate: (jsonPage) => jsonPage.gotoRepair(),
  },
];

test.beforeEach(async ({ page, jsonPage }) => {
  await jsonPage.gotoFormatter();
  await clearJsonPersistedStores(page);
  await page.reload();
});

test("json index redirects to the formatter tab", async ({ page, jsonPage }) => {
  // arrange & act
  await page.goto("/#/json");

  // assert
  await expect(page).toHaveURL(/#\/json\/formatter$/);
  await expect(jsonPage.formatterTab).toHaveAttribute("aria-selected", "true");
  await expect(jsonPage.heading("JSON Formatter")).toBeVisible();
});

test("can navigate between all json tabs", async ({ page, jsonPage }) => {
  // arrange
  await jsonPage.gotoFormatter();
  await expect(jsonPage.heading("JSON Formatter")).toBeVisible();

  // act & assert — converter
  await jsonPage.converterTab.click();
  await expect(page).toHaveURL(/#\/json\/converter$/);
  await expect(jsonPage.converterTab).toHaveAttribute("aria-selected", "true");
  await expect(jsonPage.heading("JSON Converter")).toBeVisible();

  // act & assert — repair
  await jsonPage.repairTab.click();
  await expect(page).toHaveURL(/#\/json\/repair$/);
  await expect(jsonPage.repairTab).toHaveAttribute("aria-selected", "true");
  await expect(jsonPage.heading("JSON Repair")).toBeVisible();

  // act & assert — back to formatter
  await jsonPage.formatterTab.click();
  await expect(page).toHaveURL(/#\/json\/formatter$/);
  await expect(jsonPage.formatterTab).toHaveAttribute("aria-selected", "true");
  await expect(jsonPage.heading("JSON Formatter")).toBeVisible();
});

test.describe("direct navigation", () => {
  for (const tabCase of TAB_CASES) {
    test(`loads the ${tabCase.tabName} tab`, async ({ page, jsonPage }) => {
      // arrange & act
      await tabCase.navigate(jsonPage);

      // assert
      await expect(page).toHaveURL(new RegExp(`#${tabCase.path.replace("/", "\\/")}$`));
      await expect(jsonPage.heading(tabCase.heading)).toBeVisible();
    });
  }
});
