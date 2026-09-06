import type { Locator, Page } from "@playwright/test";

export class UrlPage {
  readonly page: Page;
  readonly encoderTab: Locator;
  readonly curlTab: Locator;
  readonly parserTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.encoderTab = page.getByRole("tab", { name: "Encoder" });
    this.curlTab = page.getByRole("tab", { name: "cURL" });
    this.parserTab = page.getByRole("tab", { name: "Parser" });
  }

  async gotoEncoder(): Promise<void> {
    await this.page.goto("/#/url/encoder");
  }

  async gotoCurl(): Promise<void> {
    await this.page.goto("/#/url/curl");
  }

  async gotoParser(): Promise<void> {
    await this.page.goto("/#/url/parser");
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
