import path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "../../fixtures/pages.fixture";
import { clearVr3dViewerPersistedStore } from "../../helpers/storage";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const UNSUPPORTED_MODEL_PATH = path.join(dirname, "../../fixtures/files/unsupported-model.txt");

const DEMO_MODEL_REMOTE_FETCH_TIMEOUT_MS = 90_000;
test.setTimeout(DEMO_MODEL_REMOTE_FETCH_TIMEOUT_MS);

test.beforeEach(async ({ page, vr3dViewerPage }) => {
  await vr3dViewerPage.goto();
  await clearVr3dViewerPersistedStore(page);
  await page.reload();
});

test("loads the default demo model and renders the 3D canvas", async ({ page }) => {
  // assert — canvas is present immediately, toolbar enables once the demo model finishes loading
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.getByRole("button", { name: "Reset View" })).toBeEnabled({ timeout: 60_000 });
  await expect(page.getByRole("button", { name: "Clear" })).toBeEnabled();
});

test("toggling the Show grid setting updates the scene settings panel", async ({ page }) => {
  // arrange
  await expect(page.getByRole("button", { name: "Reset View" })).toBeEnabled({ timeout: 60_000 });
  await page.getByRole("button", { name: "Settings" }).last().click();
  const showGridItem = page.locator(".ant-form-item").filter({ hasText: "Show grid" });
  const showGridSwitch = showGridItem.getByRole("switch");
  await expect(showGridSwitch).toBeChecked();

  // act
  await showGridSwitch.click();

  // assert
  await expect(showGridSwitch).not.toBeChecked();
});

test("Clear removes the model without reloading the demo, disabling the toolbar", async ({ page }) => {
  // arrange
  await expect(page.getByRole("button", { name: "Reset View" })).toBeEnabled({ timeout: 60_000 });

  // act
  await page.getByRole("button", { name: "Clear" }).click();

  // assert
  await expect(page.getByText("Getting Started")).toBeVisible();
  await expect(page.getByRole("button", { name: "Reset View" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Fullscreen" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Clear" })).toBeDisabled();
});

test("uploading an unsupported file format shows an error toast", async ({ page }) => {
  // act
  await page.locator('input[type="file"]').setInputFiles(UNSUPPORTED_MODEL_PATH);

  // assert
  await expect(
    page.getByText("Unsupported file format. Supported: .gltf, .glb, .obj, .fbx, .stl")
  ).toBeVisible();
});

test("Fullscreen button is clickable once a model is loaded", async ({ page }) => {
  // arrange
  const fullscreenButton = page.getByRole("button", { name: "Fullscreen" });
  await expect(fullscreenButton).toBeEnabled({ timeout: 60_000 });

  // act & assert — clicking doesn't throw, canvas remains visible
  await fullscreenButton.click();
  await expect(page.locator("canvas")).toBeVisible();
});
