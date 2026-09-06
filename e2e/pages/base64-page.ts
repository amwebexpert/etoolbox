import type { Locator, Page } from "@playwright/test";

export class Base64Page {
  readonly page: Page;
  readonly stringTab: Locator;
  readonly fileTab: Locator;
  readonly dataUriTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.stringTab = page.getByRole("tab", { name: "String" });
    this.fileTab = page.getByRole("tab", { name: "File" });
    this.dataUriTab = page.getByRole("tab", { name: "Data URI" });
  }

  async gotoString(): Promise<void> {
    await this.page.goto("/#/base64/string");
  }

  async gotoFile(): Promise<void> {
    await this.page.goto("/#/base64/file");
  }

  async gotoDataUri(): Promise<void> {
    await this.page.goto("/#/base64/data-uri");
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
