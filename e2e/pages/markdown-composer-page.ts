import type { Locator, Page } from "@playwright/test";

export class MarkdownComposerPage {
  readonly page: Page;
  readonly editorTab: Locator;
  readonly composerTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editorTab = page.getByRole("tab", { name: "Markdown Editor" });
    this.composerTab = page.getByRole("tab", { name: "Markdown Composer" });
  }

  async gotoEditor(): Promise<void> {
    await this.page.goto("/#/markdown-composer/editor");
  }

  async gotoComposer(): Promise<void> {
    await this.page.goto("/#/markdown-composer/composer");
  }

  heading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }

  richMarkdownEditorRegion(): Locator {
    return this.page.getByRole("region", { name: "Rich markdown editor" });
  }

  editorProseMirror(): Locator {
    return this.richMarkdownEditorRegion().locator(".ProseMirror");
  }

  async typeInEditor(markdown: string): Promise<void> {
    const proseMirror = this.editorProseMirror();
    await proseMirror.click();
    await this.page.keyboard.press("ControlOrMeta+A");
    await this.page.keyboard.press("Delete");
    await proseMirror.pressSequentially(markdown);
  }

  crepeThemeStylesheetHref(): Promise<string | null> {
    return this.page.evaluate(() => document.getElementById("milkdown-crepe-theme-stylesheet")?.getAttribute("href") ?? null);
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

  engineSelect(): Locator {
    return this.page.getByRole("combobox", { name: "Template engine" });
  }

  async selectEngine(label: "Handlebars" | "Eta" | "LiquidJS"): Promise<void> {
    await this.engineSelect().click();
    await this.page.getByTitle(label).click();
  }

  async setMarkdown(markdown: string): Promise<void> {
    const editor = this.editorContent();
    await editor.click();
    await this.page.keyboard.press("ControlOrMeta+A");
    await this.page.keyboard.press("Delete");
    await editor.pressSequentially(markdown);
  }
}
