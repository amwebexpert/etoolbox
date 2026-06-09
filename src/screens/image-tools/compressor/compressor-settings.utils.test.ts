import { describe, expect, it } from "vitest";

import {
  MIME_TYPE_OPTIONS,
  percentToQuality,
  qualityToPercent,
  RESIZE_OPTIONS,
} from "./compressor-settings.utils";

describe("qualityToPercent", () => {
  it.each([
    [0, 0],
    [0.5, 50],
    [0.8, 80],
    [1, 100],
  ])("maps quality=%s to %s", (quality, expected) => {
    expect(qualityToPercent(quality)).toBe(expected);
  });

  it("rounds fractional percents", () => {
    expect(qualityToPercent(0.756)).toBe(76);
  });
});

describe("percentToQuality", () => {
  it.each([
    [0, 0],
    [50, 0.5],
    [80, 0.8],
    [100, 1],
  ])("maps percent=%s to %s", (percent, expected) => {
    expect(percentToQuality(percent)).toBeCloseTo(expected);
  });
});

describe("MIME_TYPE_OPTIONS", () => {
  it("includes JPEG, WebP, and PNG entries", () => {
    const values = MIME_TYPE_OPTIONS.map((option) => option.value);

    expect(values).toContain("image/jpeg");
    expect(values).toContain("image/webp");
    expect(values).toContain("image/png");
  });
});

describe("RESIZE_OPTIONS", () => {
  it("exposes none, contain, and cover strategies", () => {
    const values = RESIZE_OPTIONS.map((option) => option.value);

    expect(values).toEqual(["none", "contain", "cover"]);
  });
});
