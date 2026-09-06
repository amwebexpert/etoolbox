import type { Locator, Page } from "@playwright/test";

export class ColorsPage {
  readonly page: Page;
  readonly pickerTab: Locator;
  readonly namedTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pickerTab = page.getByRole("tab", { name: "Picker" });
    this.namedTab = page.getByRole("tab", { name: "Named Colors" });
  }

  async gotoPicker(): Promise<void> {
    await this.page.goto("/#/colors/picker");
  }

  async gotoNamed(): Promise<void> {
    await this.page.goto("/#/colors/named");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }
}
