import { expect, test } from "../../fixtures/pages.fixture";
import { clearBase64PersistedStores } from "../../helpers/storage";
import type { Base64Page } from "../../pages/base64-page";

const TAB_CASES: Array<{
  tabName: string;
  path: string;
  heading: string;
  navigate: (base64Page: Base64Page) => Promise<void>;
}> = [
  {
    tabName: "String",
    path: "/base64/string",
    heading: "Base64 String Encoder / Decoder",
    navigate: (base64Page) => base64Page.gotoString(),
  },
  {
    tabName: "File",
    path: "/base64/file",
    heading: "Base64 File Encoder / Decoder",
    navigate: (base64Page) => base64Page.gotoFile(),
  },
  {
    tabName: "Data URI",
    path: "/base64/data-uri",
    heading: "Base64 Data URI",
    navigate: (base64Page) => base64Page.gotoDataUri(),
  },
];

test.beforeEach(async ({ page, base64Page }) => {
  await base64Page.gotoString();
  await clearBase64PersistedStores(page);
  await page.reload();
});

test("base64 index redirects to the string tab", async ({ page, base64Page }) => {
  // arrange & act
  await page.goto("/#/base64");

  // assert
  await expect(page).toHaveURL(/#\/base64\/string$/);
  await expect(base64Page.stringTab).toHaveAttribute("aria-selected", "true");
  await expect(base64Page.heading("Base64 String Encoder / Decoder")).toBeVisible();
});

test("can navigate between all base64 tabs", async ({ page, base64Page }) => {
  // arrange
  await base64Page.gotoString();
  await expect(base64Page.heading("Base64 String Encoder / Decoder")).toBeVisible();

  // act & assert — file
  await base64Page.fileTab.click();
  await expect(page).toHaveURL(/#\/base64\/file$/);
  await expect(base64Page.fileTab).toHaveAttribute("aria-selected", "true");
  await expect(base64Page.heading("Base64 File Encoder / Decoder")).toBeVisible();

  // act & assert — data uri
  await base64Page.dataUriTab.click();
  await expect(page).toHaveURL(/#\/base64\/data-uri$/);
  await expect(base64Page.dataUriTab).toHaveAttribute("aria-selected", "true");
  await expect(base64Page.heading("Base64 Data URI")).toBeVisible();

  // act & assert — back to string
  await base64Page.stringTab.click();
  await expect(page).toHaveURL(/#\/base64\/string$/);
  await expect(base64Page.stringTab).toHaveAttribute("aria-selected", "true");
  await expect(base64Page.heading("Base64 String Encoder / Decoder")).toBeVisible();
});

test.describe("direct navigation", () => {
  for (const tabCase of TAB_CASES) {
    test(`loads the ${tabCase.tabName} tab`, async ({ page, base64Page }) => {
      // arrange & act
      await tabCase.navigate(base64Page);

      // assert
      await expect(page).toHaveURL(new RegExp(`#${tabCase.path.replace(/\//g, "\\/")}$`));
      await expect(base64Page.heading(tabCase.heading)).toBeVisible();
    });
  }
});
