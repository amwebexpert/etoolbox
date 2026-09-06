import type { Locator, Page } from "@playwright/test";

export class QrcodePage {
  readonly page: Page;
  readonly generatorTab: Locator;
  readonly decoderTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.generatorTab = page.getByRole("tab", { name: "Generator" });
    this.decoderTab = page.getByRole("tab", { name: "Decoder" });
  }

  async gotoGenerator(): Promise<void> {
    await this.page.goto("/#/qrcode/generator");
  }

  async gotoDecoder(): Promise<void> {
    await this.page.goto("/#/qrcode/decoder");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }
}
