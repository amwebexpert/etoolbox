import type { Locator, Page } from "@playwright/test";

export class CodingStandardsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto("/#/coding-standards");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }
}
