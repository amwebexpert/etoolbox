import { expect, test } from "../../fixtures/pages.fixture";
import { clearPokerPlanningPersistedStore } from "../../helpers/storage";

test.describe("poker planning surface (no websocket connection — ws-poker-planning.onrender.com is down/flaky by default)", () => {
  test.beforeEach(async ({ page, pokerPlanningPage }) => {
    await pokerPlanningPage.goto();
    await clearPokerPlanningPersistedStore(page);
    await page.reload();
  });

  test("landing form renders with default fields and a closed connection badge", async ({ page, pokerPlanningPage }) => {
    // assert
    await expect(pokerPlanningPage.heading("Poker Planning")).toBeVisible();
    await expect(page.getByText("closed", { exact: true })).toBeVisible();
    await expect(page.getByPlaceholder("e.g. poker.example.com")).toHaveValue("");
    await expect(page.getByPlaceholder("e.g. my-team")).toHaveValue("");
    await expect(page.getByPlaceholder("e.g. John")).toHaveValue("");
  });

  test("New Room is disabled until both Host name and Team name are filled", async ({ page }) => {
    // arrange
    const newRoomButton = page.getByRole("button", { name: "New Room" });
    await expect(newRoomButton).toBeDisabled();

    // act — host name only
    await page.getByPlaceholder("e.g. poker.example.com").fill("poker.example.com");
    await expect(newRoomButton).toBeDisabled();

    // act — team name too
    await page.getByPlaceholder("e.g. my-team").fill("my-team");

    // assert
    await expect(newRoomButton).toBeEnabled();
  });

  test("Card type select offers all four card categories", async ({ page }) => {
    // act
    await page.getByRole("combobox").click();

    // assert
    await expect(page.locator(".ant-select-item-option")).toHaveCount(4);
  });

  test("Join, Copy Link and Clear Votes are disabled and Disconnect is hidden by default", async ({ page }) => {
    // assert
    await expect(page.getByRole("button", { name: "Join" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Copy Link" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Clear Votes" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Disconnect" })).toBeHidden();
  });
});
