import type { Locator, Page } from "@playwright/test";

export class JwtDecoderPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto("/#/jwt-decoder");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }
}
