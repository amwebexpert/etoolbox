import type { Page } from "@playwright/test";

const JSON_STORE_KEYS = ["etoolbox-json-formatter", "etoolbox-json-converter", "etoolbox-json-repair"] as const;

export const clearJsonPersistedStores = async (page: Page): Promise<void> => {
  await page.evaluate((keys) => {
    keys.forEach((key) => localStorage.removeItem(key));
  }, JSON_STORE_KEYS);
};
