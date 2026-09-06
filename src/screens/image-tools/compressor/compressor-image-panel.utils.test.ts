import { describe, expect, it } from "vitest";

import { buildPanelStats } from "./compressor-image-panel.utils";

describe("buildPanelStats", () => {
  it("returns size, dimensions, and type for an original panel (no compressionRatio)", () => {
    // arrange
    const args = {
      sizeBytes: 2048,
      width: 1920,
      height: 1080,
      mimeType: "image/png",
    };

    // act
    const result = buildPanelStats(args);

    // assert
    expect(result).toEqual([
      { label: "Size", value: "2.04 kB" },
      { label: "Dimensions", value: "1920 × 1080" },
      { label: "Type", value: "image/png" },
    ]);
  });

  it("appends a Ratio row when compressionRatio is provided (compressed panel)", () => {
    // arrange
    const args = {
      sizeBytes: 1024,
      width: 800,
      height: 600,
      mimeType: "image/webp",
      compressionRatio: "-50%",
    };

    // act
    const result = buildPanelStats(args);

    // assert
    expect(result).toContainEqual({ label: "Ratio", value: "-50%" });
    expect(result).toHaveLength(4);
  });

  it("falls back to a placeholder when size is not yet known", () => {
    // arrange
    const args = {
      sizeBytes: null,
      width: null,
      height: null,
      mimeType: "image/jpeg",
    };

    // act
    const result = buildPanelStats(args);
    const sizeRow = result.find((row) => row.label === "Size");

    // assert
    expect(sizeRow?.value).toBe("—");
  });

  it("falls back to a placeholder when dimensions are not yet known", () => {
    // arrange
    const args = {
      sizeBytes: 1024,
      width: null,
      height: null,
      mimeType: "image/jpeg",
    };

    // act
    const result = buildPanelStats(args);
    const dimsRow = result.find((row) => row.label === "Dimensions");

    // assert
    expect(dimsRow?.value).toBe("—");
  });

  it("falls back to a placeholder when mimeType is empty", () => {
    // arrange
    const args = {
      sizeBytes: 0,
      width: 1,
      height: 1,
      mimeType: "",
    };

    // act
    const result = buildPanelStats(args);
    const typeRow = result.find((row) => row.label === "Type");

    // assert
    expect(typeRow?.value).toBe("—");
  });

  it("formats sizes greater than 1 MB using MB units", () => {
    // arrange
    const args = {
      sizeBytes: 1024 * 1024 * 3,
      width: 100,
      height: 100,
      mimeType: "image/png",
    };

    // act
    const result = buildPanelStats(args);
    const sizeRow = result.find((row) => row.label === "Size");

    // assert
    expect(sizeRow?.value).toBe("3.14 MB");
  });
});
