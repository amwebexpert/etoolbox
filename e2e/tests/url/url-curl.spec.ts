import { expect, test } from "../../fixtures/pages.fixture";
import { mainActionButton } from "../../helpers/main-content";
import { selectOption } from "../../helpers/select";
import { clearUrlPersistedStores } from "../../helpers/storage";

test.beforeEach(async ({ page, urlPage }) => {
  await urlPage.gotoCurl();
  await clearUrlPersistedStores(page);
  await page.reload();
});

test("shows the seeded default cURL command and converts it", async ({ page }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type the cURL command here");

  // assert — seeded command is present
  await expect(input).toHaveValue(/curl -X POST https:\/\/api\.example\.com\/users/);

  // act
  await mainActionButton({ page, name: "Convert" }).click();

  // assert — default target language is JavaScript (Fetch)
  await expect(page.locator("pre")).toContainText("api.example.com/users");
});

test("changing the target language re-converts the result", async ({ page }) => {
  // arrange
  await mainActionButton({ page, name: "Convert" }).click();
  await expect(page.locator("pre")).toContainText("api.example.com/users");

  // act — switch target language to Python (Requests)
  await selectOption({ page, trigger: page.locator(".ant-select").first(), option: "Python (Requests)" });

  // assert — result re-converts automatically to python
  await expect(page.locator("pre")).toContainText(/requests\.(post|request)/);
});

test("malformed cURL command shows a conversion error", async ({ page }) => {
  // arrange
  const input = page.getByPlaceholder("Paste or type the cURL command here");

  // act
  await input.fill("not a curl command at all");
  await mainActionButton({ page, name: "Convert" }).click();

  // assert
  await expect(page.getByText(/Error converting cURL command:|Error: Failed to convert/)).toBeVisible();
});
