import { expect, test } from "../../fixtures/pages.fixture";
import { clearCodingStandardsPersistedStore } from "../../helpers/storage";

const HUGGING_FACE_MODEL_DOWNLOAD_TIMEOUT_MS = 180_000;
test.setTimeout(HUGGING_FACE_MODEL_DOWNLOAD_TIMEOUT_MS);

test.beforeEach(async ({ page, codingStandardsPage }) => {
  await codingStandardsPage.goto();
  await clearCodingStandardsPersistedStore(page);
  await page.reload();
});

test("searching a known topic returns non-empty results once the model is ready", async ({ page }) => {
  // arrange — the engine is ready once the blank-query auto-search resolves to the empty-results message
  await expect(page.getByText("No results found. Try a different search query.")).toBeVisible({
    timeout: 150_000,
  });
  const searchInput = page.getByPlaceholder("Search for coding standards and best practices...");

  // act
  await searchInput.fill("naming");

  // assert
  await expect(page.locator(".ant-collapse-item").first()).toBeVisible({ timeout: 15_000 });
});

test("searching a nonsense query shows the no-results message", async ({ page }) => {
  // arrange — wait for the engine to be ready
  await expect(page.getByText("No results found. Try a different search query.")).toBeVisible({
    timeout: 150_000,
  });
  const searchInput = page.getByPlaceholder("Search for coding standards and best practices...");

  // act
  await searchInput.fill("zzzznonsensequeryxyzzz123");

  // assert
  await expect(page.getByText("No results found. Try a different search query.")).toBeVisible({ timeout: 15_000 });
});
