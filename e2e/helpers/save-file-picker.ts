import type { Page } from "@playwright/test";

// Headless Chromium exposes showSaveFilePicker but cannot drive its native dialog; removing it forces the download fallback habit-hooks-disable non-essential-comment
export const disableSaveFilePicker = (page: Page): Promise<void> =>
  page.addInitScript(() => {
    Reflect.deleteProperty(window, "showSaveFilePicker");
  });
