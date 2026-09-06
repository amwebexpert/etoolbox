import { expect, test as base } from "@playwright/test";

import { JsonPage } from "../pages/json-page";

interface PageFixtures {
  jsonPage: JsonPage;
}

export const test = base.extend<PageFixtures>({
  jsonPage: async ({ page }, provideFixture) => {
    await provideFixture(new JsonPage(page));
  },
});

export { expect };
