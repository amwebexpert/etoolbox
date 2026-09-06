import type { Locator, Page } from "@playwright/test";

export class DateConverterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto("/#/date-converter");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }
}
