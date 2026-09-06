import { describe, expect, it } from "vitest";

import { MIME_TYPE_OPTIONS, percentToQuality, qualityToPercent, RESIZE_OPTIONS } from "./compressor-settings.utils";

interface QualityToPercentCase {
  quality: number;
  expected: number;
}

describe("qualityToPercent", () => {
  it.each`
    quality | expected
    ${0}    | ${0}
    ${0.5}  | ${50}
    ${0.8}  | ${80}
    ${1}    | ${100}
  `("maps quality $quality to $expected", ({ quality, expected }: QualityToPercentCase) => {
    // arrange & act
    const percent = qualityToPercent(quality);

    // assert
    expect(percent).toBe(expected);
  });

  it("rounds fractional percents", () => {
    // arrange
    const quality = 0.756;

    // act
    const percent = qualityToPercent(quality);

    // assert
    expect(percent).toBe(76);
  });
});

interface PercentToQualityCase {
  percent: number;
  expected: number;
}

describe("percentToQuality", () => {
  it.each`
    percent | expected
    ${0}    | ${0}
    ${50}   | ${0.5}
    ${80}   | ${0.8}
    ${100}  | ${1}
  `("maps percent $percent to $expected", ({ percent, expected }: PercentToQualityCase) => {
    // arrange & act
    const quality = percentToQuality(percent);

    // assert
    expect(quality).toBeCloseTo(expected);
  });
});

describe("MIME_TYPE_OPTIONS", () => {
  it("includes JPEG, WebP, and PNG entries", () => {
    // act
    const values = MIME_TYPE_OPTIONS.map((option) => option.value);

    // assert
    expect(values).toContain("image/jpeg");
    expect(values).toContain("image/webp");
    expect(values).toContain("image/png");
  });
});

describe("RESIZE_OPTIONS", () => {
  it("exposes none, contain, and cover strategies", () => {
    // act
    const values = RESIZE_OPTIONS.map((option) => option.value);

    // assert
    expect(values).toEqual(["none", "contain", "cover"]);
  });
});
