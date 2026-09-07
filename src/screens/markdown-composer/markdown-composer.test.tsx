import { describe, expect, it } from "vitest";

import { TAB_ITEMS } from "./markdown-composer.constants";

describe("markdown-composer TAB_ITEMS", () => {
  it("includes a Markdown Composer tab keyed to /markdown-composer/composer", () => {
    // act
    const composerTab = TAB_ITEMS.find((item) => item.key === "/markdown-composer/composer");

    // assert
    expect(composerTab).toBeDefined();
    expect(composerTab?.label).toBe("Markdown Composer");
  });
});
