import { describe, expect, it } from "vitest";

import { TAB_ITEMS } from "./base64";

describe("base64 TAB_ITEMS", () => {
  it("includes an Image URI tab keyed to /base64/image", () => {
    const imageTab = TAB_ITEMS.find((item) => item.key === "/base64/image");

    expect(imageTab).toBeDefined();
    expect(imageTab?.label).toBe("Image URI");
  });
});
