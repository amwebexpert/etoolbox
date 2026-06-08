import { describe, expect, it } from "vitest";

import { TAB_ITEMS } from "./base64.constants";

describe("base64 TAB_ITEMS", () => {
  it("includes a Data URI tab keyed to /base64/data-uri", () => {
    const dataUriTab = TAB_ITEMS.find((item) => item.key === "/base64/data-uri");

    expect(dataUriTab).toBeDefined();
    expect(dataUriTab?.label).toBe("Data URI");
  });
});
