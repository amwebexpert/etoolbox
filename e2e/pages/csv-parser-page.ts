import type { Locator, Page } from "@playwright/test";

export class CsvParserPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto("/#/csv-parser");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }

  resultSection(label: string): Locator {
    return this.page.getByText(label, { exact: true });
  }

  resultContent(label: string): Locator {
    return this.resultSection(label).locator("xpath=ancestor::div[1]/..");
  }
}
