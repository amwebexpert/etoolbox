import { describe, expect, it } from "vitest";

import type { ColorTheme } from "./themes";
import { THEMES } from "./themes";

const EXPECTED_KEYS: ColorTheme[] = ["red", "green", "orange", "blue", "pink"];
const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

describe("THEMES", () => {
  it("contains exactly the five expected theme keys", () => {
    expect(Object.keys(THEMES).sort()).toEqual([...EXPECTED_KEYS].sort());
  });

  it.each`
    key
    ${"red"}
    ${"green"}
    ${"orange"}
    ${"blue"}
    ${"pink"}
  `("theme '$key' exposes valid primary, secondary, and label", ({ key }: { key: ColorTheme }) => {
    expect(THEMES[key].primary).toMatch(HEX_PATTERN);
    expect(THEMES[key].secondary).toMatch(HEX_PATTERN);
    expect(THEMES[key].label).toBeTruthy();
    expect(typeof THEMES[key].label).toBe("string");
  });
});
