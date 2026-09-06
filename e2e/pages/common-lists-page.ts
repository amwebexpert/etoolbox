import type { Locator, Page } from "@playwright/test";

export class CommonListsPage {
  readonly page: Page;
  readonly mimeTypesTab: Locator;
  readonly htmlEntitiesTab: Locator;
  readonly httpStatusCodesTab: Locator;
  readonly httpHeadersTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mimeTypesTab = page.getByRole("tab", { name: "Mime-types" });
    this.htmlEntitiesTab = page.getByRole("tab", { name: "HTML Entities" });
    this.httpStatusCodesTab = page.getByRole("tab", { name: "HTTP Status Codes" });
    this.httpHeadersTab = page.getByRole("tab", { name: "HTTP Headers" });
  }

  async gotoMimeTypes(): Promise<void> {
    await this.page.goto("/#/common-lists/mime-types");
  }

  async gotoHtmlEntities(): Promise<void> {
    await this.page.goto("/#/common-lists/html-entities");
  }

  async gotoHttpStatusCodes(): Promise<void> {
    await this.page.goto("/#/common-lists/http-status-codes");
  }

  async gotoHttpHeaders(): Promise<void> {
    await this.page.goto("/#/common-lists/http-headers");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }
}
