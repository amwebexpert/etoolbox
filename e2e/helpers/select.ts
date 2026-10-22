import { expect, type Locator, type Page } from "@playwright/test";

interface SelectOptionArgs {
  page: Page;
  trigger: Locator;
  option: string | RegExp;
}

// antd ignores option clicks landing during the dropdown open animation; retry until the dropdown closes habit-hooks-disable non-essential-comment
export const selectOption = async ({ page, trigger, option }: SelectOptionArgs): Promise<void> => {
  const optionItem = page.locator(".ant-select-item-option").filter({ hasText: option }).first();

  await expect(async () => {
    if (!(await optionItem.isVisible())) await trigger.click();
    await optionItem.click({ timeout: 2_000 });
    await expect(optionItem).toBeHidden({ timeout: 1_000 });
  }).toPass();
};
