import type { Locator, Page } from "@playwright/test";

export class MarkdownComposerPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto("/#/markdown-composer");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }

  jsonDataTextarea(): Locator {
    return this.page.getByRole("textbox", { name: "JSON data" });
  }

  jsonErrorAlert(): Locator {
    return this.page.getByRole("alert").filter({ hasText: "Invalid JSON" });
  }

  previewRegion(): Locator {
    return this.page.getByRole("region", { name: "Markdown preview" });
  }

  editorRegion(): Locator {
    return this.page.getByRole("region", { name: "Markdown editor" });
  }

  editorContent(): Locator {
    return this.editorRegion().locator(".cm-content");
  }

  templatePreviewErrorAlert(): Locator {
    return this.page.getByRole("alert").filter({ hasText: "Template preview error" });
  }

  async setMarkdown(markdown: string): Promise<void> {
    const editor = this.editorContent();
    await editor.click();
    await this.page.keyboard.press("ControlOrMeta+A");
    await this.page.keyboard.press("Delete");
    await editor.pressSequentially(markdown);
  }
}
