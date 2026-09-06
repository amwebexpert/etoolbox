import type { Locator, Page } from "@playwright/test";

export class Vr3dViewerPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto("/#/vr-3d-viewer");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }
}
