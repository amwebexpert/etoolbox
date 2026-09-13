import type { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto("/#/");
  }

  get grid(): Locator {
    return this.page.locator("section").first();
  }

  get sidebar(): Locator {
    return this.page.locator(".ant-layout-sider");
  }

  get searchInput(): Locator {
    return this.page.getByPlaceholder("Search tools by name or description...");
  }

  get pinnedHeading(): Locator {
    return this.page.getByRole("heading", { name: "Pinned" });
  }

  pinButton(toolName: string): Locator {
    return this.grid.getByRole("button", { name: `Pin ${toolName}` }).first();
  }

  gridCard(toolName: string): Locator {
    return this.grid.getByText(toolName, { exact: true });
  }

  sidebarLink(toolName: string): Locator {
    return this.sidebar.getByRole("link", { name: toolName });
  }
}
