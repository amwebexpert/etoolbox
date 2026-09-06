import type { Locator, Page } from "@playwright/test";

export class PokerPlanningPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto("/#/poker-planning");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }
}
