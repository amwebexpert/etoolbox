import { expect, test } from "../../fixtures/pages.fixture";
import { clearColorsPersistedStores } from "../../helpers/storage";

test.beforeEach(async ({ page, colorsPage }) => {
  await colorsPage.gotoPicker();
  await clearColorsPersistedStores(page);
  await page.reload();
});

test("colors index redirects to the picker tab", async ({ page, colorsPage }) => {
  // arrange & act
  await page.goto("/#/colors");

  // assert
  await expect(page).toHaveURL(/#\/colors\/picker$/);
  await expect(colorsPage.pickerTab).toHaveAttribute("aria-selected", "true");
  await expect(colorsPage.heading("Color Picker")).toBeVisible();
});

test("can navigate between all colors tabs", async ({ page, colorsPage }) => {
  // arrange
  await colorsPage.gotoPicker();
  await expect(colorsPage.heading("Color Picker")).toBeVisible();

  // act & assert — named colors
  await colorsPage.namedTab.click();
  await expect(page).toHaveURL(/#\/colors\/named$/);
  await expect(colorsPage.namedTab).toHaveAttribute("aria-selected", "true");
  await expect(colorsPage.heading("Named Colors")).toBeVisible();

  // act & assert — back to picker
  await colorsPage.pickerTab.click();
  await expect(page).toHaveURL(/#\/colors\/picker$/);
  await expect(colorsPage.pickerTab).toHaveAttribute("aria-selected", "true");
  await expect(colorsPage.heading("Color Picker")).toBeVisible();
});

test.describe("direct navigation", () => {
  test("loads the Picker tab", async ({ page, colorsPage }) => {
    // arrange & act
    await colorsPage.gotoPicker();

    // assert
    await expect(page).toHaveURL(/#\/colors\/picker$/);
    await expect(colorsPage.heading("Color Picker")).toBeVisible();
  });

  test("loads the Named Colors tab", async ({ page, colorsPage }) => {
    // arrange & act
    await colorsPage.gotoNamed();

    // assert
    await expect(page).toHaveURL(/#\/colors\/named$/);
    await expect(colorsPage.heading("Named Colors")).toBeVisible();
  });
});
