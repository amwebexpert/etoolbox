import type { Locator, Page } from "@playwright/test";

export class JsonPage {
  readonly page: Page;
  readonly formatterTab: Locator;
  readonly converterTab: Locator;
  readonly repairTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formatterTab = page.getByRole("tab", { name: "Formatter" });
    this.converterTab = page.getByRole("tab", { name: "Converter" });
    this.repairTab = page.getByRole("tab", { name: "Repair" });
  }

  async gotoFormatter(): Promise<void> {
    await this.page.goto("/#/json/formatter");
  }

  async gotoConverter(): Promise<void> {
    await this.page.goto("/#/json/converter");
  }

  async gotoRepair(): Promise<void> {
    await this.page.goto("/#/json/repair");
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
