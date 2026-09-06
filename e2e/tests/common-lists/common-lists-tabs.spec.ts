import { expect, test } from "../../fixtures/pages.fixture";
import type { CommonListsPage } from "../../pages/common-lists-page";

const TAB_CASES: Array<{
  tabName: string;
  path: string;
  heading: string;
  navigate: (commonListsPage: CommonListsPage) => Promise<void>;
}> = [
  {
    tabName: "Mime-types",
    path: "/common-lists/mime-types",
    heading: "MIME Types",
    navigate: (commonListsPage) => commonListsPage.gotoMimeTypes(),
  },
  {
    tabName: "HTML Entities",
    path: "/common-lists/html-entities",
    heading: "HTML Entities",
    navigate: (commonListsPage) => commonListsPage.gotoHtmlEntities(),
  },
  {
    tabName: "HTTP Status Codes",
    path: "/common-lists/http-status-codes",
    heading: "HTTP Status Codes",
    navigate: (commonListsPage) => commonListsPage.gotoHttpStatusCodes(),
  },
  {
    tabName: "HTTP Headers",
    path: "/common-lists/http-headers",
    heading: "HTTP Headers",
    navigate: (commonListsPage) => commonListsPage.gotoHttpHeaders(),
  },
];

test.beforeEach(async ({ commonListsPage }) => {
  await commonListsPage.gotoMimeTypes();
});

test("common-lists index redirects to the mime-types tab", async ({ page, commonListsPage }) => {
  // arrange & act
  await page.goto("/#/common-lists");

  // assert
  await expect(page).toHaveURL(/#\/common-lists\/mime-types$/);
  await expect(commonListsPage.mimeTypesTab).toHaveAttribute("aria-selected", "true");
  await expect(commonListsPage.heading("MIME Types")).toBeVisible();
});

test("can navigate between all common-lists tabs", async ({ page, commonListsPage }) => {
  // arrange
  await commonListsPage.gotoMimeTypes();
  await expect(commonListsPage.heading("MIME Types")).toBeVisible();

  // act & assert — html entities
  await commonListsPage.htmlEntitiesTab.click();
  await expect(page).toHaveURL(/#\/common-lists\/html-entities$/);
  await expect(commonListsPage.htmlEntitiesTab).toHaveAttribute("aria-selected", "true");
  await expect(commonListsPage.heading("HTML Entities")).toBeVisible();

  // act & assert — http status codes
  await commonListsPage.httpStatusCodesTab.click();
  await expect(page).toHaveURL(/#\/common-lists\/http-status-codes$/);
  await expect(commonListsPage.httpStatusCodesTab).toHaveAttribute("aria-selected", "true");
  await expect(commonListsPage.heading("HTTP Status Codes")).toBeVisible();

  // act & assert — http headers
  await commonListsPage.httpHeadersTab.click();
  await expect(page).toHaveURL(/#\/common-lists\/http-headers$/);
  await expect(commonListsPage.httpHeadersTab).toHaveAttribute("aria-selected", "true");
  await expect(commonListsPage.heading("HTTP Headers")).toBeVisible();

  // act & assert — back to mime-types
  await commonListsPage.mimeTypesTab.click();
  await expect(page).toHaveURL(/#\/common-lists\/mime-types$/);
  await expect(commonListsPage.mimeTypesTab).toHaveAttribute("aria-selected", "true");
  await expect(commonListsPage.heading("MIME Types")).toBeVisible();
});

test.describe("direct navigation", () => {
  for (const tabCase of TAB_CASES) {
    test(`loads the ${tabCase.tabName} tab`, async ({ page, commonListsPage }) => {
      // arrange & act
      await tabCase.navigate(commonListsPage);

      // assert
      await expect(page).toHaveURL(new RegExp(`#${tabCase.path.replace(/\//g, "\\/")}$`));
      await expect(commonListsPage.heading(tabCase.heading)).toBeVisible();
    });
  }
});
