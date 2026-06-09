import { describe, expect, it, vi } from "vitest";

import { extractImageFromClipboardItems, isImageFile } from "./compressor.utils";

const makeFile = (type: string): File => new File(["x"], `f.${type.split("/")[1] ?? "bin"}`, { type });

interface FakeClipboardItem {
  kind: string;
  type: string;
  getAsFile: () => File | null;
}

const makeItem = (type: string, file: File | null): FakeClipboardItem => ({
  kind: file ? "file" : "string",
  type,
  getAsFile: vi.fn(() => file),
});

describe("isImageFile", () => {
  it.each([
    ["image/png", true],
    ["image/jpeg", true],
    ["image/webp", true],
    ["text/plain", false],
    ["application/pdf", false],
    ["", false],
  ])("returns %s for type=%s -> %s", (type, expected) => {
    const file = makeFile(type);

    const result = isImageFile(file);

    expect(result).toBe(expected);
  });
});

describe("extractImageFromClipboardItems", () => {
  it("returns the first image file from items", () => {
    const imageFile = makeFile("image/png");
    const items = [makeItem("text/plain", null), makeItem("image/png", imageFile)];

    const result = extractImageFromClipboardItems(items);

    expect(result).toBe(imageFile);
  });

  it("returns null when no image item exists", () => {
    const items = [makeItem("text/plain", null), makeItem("text/html", null)];

    const result = extractImageFromClipboardItems(items);

    expect(result).toBeNull();
  });

  it("returns null when items list is empty", () => {
    const result = extractImageFromClipboardItems([]);

    expect(result).toBeNull();
  });

  it("ignores image items whose getAsFile returns null", () => {
    const items = [makeItem("image/png", null)];

    const result = extractImageFromClipboardItems(items);

    expect(result).toBeNull();
  });
});
