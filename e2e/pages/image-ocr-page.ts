import type { Locator, Page } from "@playwright/test";

export class ImageOcrPage {
  readonly page: Page;
  readonly ocrTab: Locator;
  readonly compressorTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ocrTab = page.getByRole("tab", { name: "OCR" });
    this.compressorTab = page.getByRole("tab", { name: "Compressor" });
  }

  async gotoOcr(): Promise<void> {
    await this.page.goto("/#/image-ocr/ocr");
  }

  async gotoCompressor(): Promise<void> {
    await this.page.goto("/#/image-ocr/compressor");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }
}
