import type { Page } from "@playwright/test";

export const mainContent = (page: Page) => page.getByRole("main");

interface MainActionButtonArgs {
  page: Page;
  name: string;
}

export const mainActionButton = ({ page, name }: MainActionButtonArgs) =>
  mainContent(page).getByRole("button", { name });
