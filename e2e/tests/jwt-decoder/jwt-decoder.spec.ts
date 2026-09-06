import { expect, test } from "../../fixtures/pages.fixture";
import { clearJwtDecoderPersistedStore } from "../../helpers/storage";

test.beforeEach(async ({ page, jwtDecoderPage }) => {
  await jwtDecoderPage.goto();
  await clearJwtDecoderPersistedStore(page);
  await page.reload();
});

test("loading the basic valid sample decodes header, claims and payload", async ({ page, jwtDecoderPage }) => {
  // arrange
  await expect(jwtDecoderPage.heading("JWT Decoder")).toBeVisible();

  // act
  await page.getByRole("button", { name: "Load Sample" }).click();
  await page.getByRole("menuitem", { name: "Basic JWT (valid)" }).click();

  // assert — algorithm card
  await expect(page.getByText("Algorithm:")).toBeVisible();
  await expect(page.getByText("HS256").first()).toBeVisible();

  // assert — token claims card
  await expect(page.getByText("Token Claims")).toBeVisible();
  await expect(page.getByText("Subject (sub)")).toBeVisible();
  await expect(page.getByText("Issuer (iss)")).toBeVisible();

  // assert — header/payload/signature collapse panels
  await expect(page.getByText("Header", { exact: true })).toBeVisible();
  await expect(page.getByText("Payload", { exact: true })).toBeVisible();
  await expect(page.getByText("Signature", { exact: true })).toBeVisible();
});

test("loading the expired sample shows an Expired tag on the payload panel", async ({ page }) => {
  // act
  await page.getByRole("button", { name: "Load Sample" }).click();
  await page.getByRole("menuitem", { name: "Expired JWT" }).click();

  // assert
  await expect(page.getByText("Expired", { exact: true }).first()).toBeVisible();
});

test("typing an invalid token shows an error state", async ({ page }) => {
  // arrange
  const tokenInput = page.getByPlaceholder(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );

  // act
  await tokenInput.fill("this-is-not-a-jwt");

  // assert
  await expect(page.getByRole("alert")).toBeVisible();
});

test("clearing the token returns to the empty placeholder", async ({ page }) => {
  // arrange
  await page.getByRole("button", { name: "Load Sample" }).click();
  await page.getByRole("menuitem", { name: "Basic JWT (valid)" }).click();
  await expect(page.getByText("Algorithm:")).toBeVisible();

  // act
  await page.getByRole("button", { name: "Clear" }).click();

  // assert
  await expect(page.getByText("Decoded JWT will appear here")).toBeVisible();
});
