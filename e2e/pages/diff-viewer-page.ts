import type { Locator, Page } from "@playwright/test";

export class DiffViewerPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto("/#/diff");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }
}
