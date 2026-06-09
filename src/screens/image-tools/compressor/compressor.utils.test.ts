import { describe, expect, it, vi } from "vitest";

import {
  buildExportFilename,
  compressImage,
  computeCompressionRatio,
  extractImageFromClipboardItems,
  formatFileSize,
  isImageFile,
} from "./compressor.utils";

describe("formatFileSize", () => {
  it("returns '1.00 KB' for 1024 bytes", () => {
    expect(formatFileSize(1024)).toBe("1.00 KB");
  });

  it("returns '1.00 MB' for 1048576 bytes", () => {
    expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
  });

  it("returns bytes for values smaller than 1 KB", () => {
    expect(formatFileSize(512)).toBe("512 B");
  });

  it("returns GB for very large values", () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe("1.00 GB");
  });
});

describe("computeCompressionRatio", () => {
  it("returns '-50%' when compressed is half of original", () => {
    expect(computeCompressionRatio(1000, 500)).toBe("-50%");
  });

  it("returns '0%' when compressed equals original", () => {
    expect(computeCompressionRatio(1000, 1000)).toBe("0%");
  });

  it("returns positive percentage when compressed is larger than original", () => {
    expect(computeCompressionRatio(100, 150)).toBe("50%");
  });

  it("returns '0%' when original is zero (avoids division by zero)", () => {
    expect(computeCompressionRatio(0, 100)).toBe("0%");
  });
});

describe("buildExportFilename", () => {
  it("returns 'photo_compressed.webp' for ('photo.png', 'image/webp')", () => {
    expect(buildExportFilename("photo.png", "image/webp")).toBe("photo_compressed.webp");
  });

  it("preserves the original base name when extension differs", () => {
    expect(buildExportFilename("my-image.jpg", "image/png")).toBe("my-image_compressed.png");
  });

  it("handles filenames without an extension", () => {
    expect(buildExportFilename("photo", "image/jpeg")).toBe("photo_compressed.jpg");
  });

  it("strips only the final extension when name has multiple dots", () => {
    expect(buildExportFilename("a.b.png", "image/webp")).toBe("a.b_compressed.webp");
  });
});

const makeFile = (type: string): File => new File(["x"], `f.${type.split("/")[1] ?? "bin"}`, { type });

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

describe("compressImage", () => {
  it("returns a Promise", () => {
    const stub = new File([new Uint8Array([0])], "stub.png", { type: "image/png" });

    const result = compressImage(stub);

    expect(result).toBeInstanceOf(Promise);
    result.catch(() => undefined);
  });
});
