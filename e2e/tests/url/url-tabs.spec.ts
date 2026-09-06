import { expect, test } from "../../fixtures/pages.fixture";
import { clearUrlPersistedStores } from "../../helpers/storage";
import type { UrlPage } from "../../pages/url-page";

const TAB_CASES: Array<{
  tabName: string;
  path: string;
  heading: string;
  navigate: (urlPage: UrlPage) => Promise<void>;
}> = [
  {
    tabName: "Encoder",
    path: "/url/encoder",
    heading: "URL Encoder / Decoder",
    navigate: (urlPage) => urlPage.gotoEncoder(),
  },
  {
    tabName: "cURL",
    path: "/url/curl",
    heading: "cURL Converter",
    navigate: (urlPage) => urlPage.gotoCurl(),
  },
  {
    tabName: "Parser",
    path: "/url/parser",
    heading: "URL Parser",
    navigate: (urlPage) => urlPage.gotoParser(),
  },
];

test.beforeEach(async ({ page, urlPage }) => {
  await urlPage.gotoEncoder();
  await clearUrlPersistedStores(page);
  await page.reload();
});

test("url index redirects to the encoder tab", async ({ page, urlPage }) => {
  // arrange & act
  await page.goto("/#/url");

  // assert
  await expect(page).toHaveURL(/#\/url\/encoder$/);
  await expect(urlPage.encoderTab).toHaveAttribute("aria-selected", "true");
  await expect(urlPage.heading("URL Encoder / Decoder")).toBeVisible();
});

test("can navigate between all url tabs", async ({ page, urlPage }) => {
  // arrange
  await urlPage.gotoEncoder();
  await expect(urlPage.heading("URL Encoder / Decoder")).toBeVisible();

  // act & assert — cURL
  await urlPage.curlTab.click();
  await expect(page).toHaveURL(/#\/url\/curl$/);
  await expect(urlPage.curlTab).toHaveAttribute("aria-selected", "true");
  await expect(urlPage.heading("cURL Converter")).toBeVisible();

  // act & assert — parser
  await urlPage.parserTab.click();
  await expect(page).toHaveURL(/#\/url\/parser$/);
  await expect(urlPage.parserTab).toHaveAttribute("aria-selected", "true");
  await expect(urlPage.heading("URL Parser")).toBeVisible();

  // act & assert — back to encoder
  await urlPage.encoderTab.click();
  await expect(page).toHaveURL(/#\/url\/encoder$/);
  await expect(urlPage.encoderTab).toHaveAttribute("aria-selected", "true");
  await expect(urlPage.heading("URL Encoder / Decoder")).toBeVisible();
});

test.describe("direct navigation", () => {
  for (const tabCase of TAB_CASES) {
    test(`loads the ${tabCase.tabName} tab`, async ({ page, urlPage }) => {
      // arrange & act
      await tabCase.navigate(urlPage);

      // assert
      await expect(page).toHaveURL(new RegExp(`#${tabCase.path.replace("/", "\\/")}$`));
      await expect(urlPage.heading(tabCase.heading)).toBeVisible();
    });
  }
});
