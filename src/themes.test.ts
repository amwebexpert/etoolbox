import { describe, expect, it } from "vitest";

import { type ColorTheme, THEMES } from "./themes";

const EXPECTED_KEYS: ColorTheme[] = ["red", "green", "orange", "blue", "pink"];
const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

interface ThemeKeyCase {
  key: ColorTheme;
}

describe("THEMES", () => {
  it("contains exactly the five expected theme keys", () => {
    // arrange
    const expectedKeys = [...EXPECTED_KEYS].sort();

    // act
    const actualKeys = Object.keys(THEMES).sort();

    // assert
    expect(actualKeys).toEqual(expectedKeys);
  });

  it.each`
    key
    ${"red"}
    ${"green"}
    ${"orange"}
    ${"blue"}
    ${"pink"}
  `("theme '$key' exposes valid primary, secondary, and label", ({ key }: ThemeKeyCase) => {
    // arrange
    const theme = THEMES[key];

    // act
    const primary = theme.primary;
    const secondary = theme.secondary;
    const label = theme.label;

    // assert
    expect(primary).toMatch(HEX_PATTERN);
    expect(secondary).toMatch(HEX_PATTERN);
    expect(label).toBeTruthy();
    expect(typeof label).toBe("string");
  });
});
