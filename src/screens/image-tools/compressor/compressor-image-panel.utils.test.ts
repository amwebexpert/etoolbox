import { describe, expect, it } from "vitest";

import { buildPanelStats } from "./compressor-image-panel.utils";

describe("buildPanelStats", () => {
  it("returns size, dimensions, and type for an original panel (no compressionRatio)", () => {
    const result = buildPanelStats({
      sizeBytes: 2048,
      width: 1920,
      height: 1080,
      mimeType: "image/png",
    });

    expect(result).toEqual([
      { label: "Size", value: "2.00 KB" },
      { label: "Dimensions", value: "1920 × 1080" },
      { label: "Type", value: "image/png" },
    ]);
  });

  it("appends a Ratio row when compressionRatio is provided (compressed panel)", () => {
    const result = buildPanelStats({
      sizeBytes: 1024,
      width: 800,
      height: 600,
      mimeType: "image/webp",
      compressionRatio: "-50%",
    });

    expect(result).toContainEqual({ label: "Ratio", value: "-50%" });
    expect(result).toHaveLength(4);
  });

  it("falls back to a placeholder when dimensions are not yet known", () => {
    const result = buildPanelStats({
      sizeBytes: 0,
      width: null,
      height: null,
      mimeType: "image/jpeg",
    });

    const dimsRow = result.find((row) => row.label === "Dimensions");

    expect(dimsRow?.value).toBe("—");
  });

  it("falls back to a placeholder when mimeType is empty", () => {
    const result = buildPanelStats({
      sizeBytes: 0,
      width: 1,
      height: 1,
      mimeType: "",
    });

    const typeRow = result.find((row) => row.label === "Type");

    expect(typeRow?.value).toBe("—");
  });

  it("formats sizes greater than 1 MB using MB units", () => {
    const result = buildPanelStats({
      sizeBytes: 1024 * 1024 * 3,
      width: 100,
      height: 100,
      mimeType: "image/png",
    });

    const sizeRow = result.find((row) => row.label === "Size");

    expect(sizeRow?.value).toBe("3.00 MB");
  });
});
