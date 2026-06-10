import { afterEach, describe, expect, it, vi } from "vitest";

import type { CompressorSettings } from "./compressor.types";
import {
  buildCompressorOptions,
  buildExportFilename,
  canEnableDownload,
  compressImage,
  computeCompressionRatio,
  extractImageFromClipboardItems,
  formatFileSize,
  isImageFile,
  triggerDownload,
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

const BASE_SETTINGS: CompressorSettings = {
  quality: 0.8,
  mimeType: "auto",
  maxWidth: 4096,
  maxHeight: 4096,
  minWidth: 0,
  minHeight: 0,
  width: 0,
  height: 0,
  resize: "none",
  convertSize: 5_000_000,
  checkOrientation: true,
};

describe("buildCompressorOptions", () => {
  it("omits mimeType when set to 'auto'", () => {
    const result = buildCompressorOptions(BASE_SETTINGS);

    expect(result.mimeType).toBeUndefined();
  });

  it("forwards explicit mimeType", () => {
    const result = buildCompressorOptions({ ...BASE_SETTINGS, mimeType: "image/webp" });

    expect(result.mimeType).toBe("image/webp");
  });

  it("omits zero width / height / minWidth / minHeight", () => {
    const result = buildCompressorOptions(BASE_SETTINGS);

    expect(result.width).toBeUndefined();
    expect(result.height).toBeUndefined();
    expect(result.minWidth).toBeUndefined();
    expect(result.minHeight).toBeUndefined();
  });

  it("forwards positive width / height / minWidth / minHeight", () => {
    const result = buildCompressorOptions({
      ...BASE_SETTINGS,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 50,
    });

    expect(result.width).toBe(800);
    expect(result.height).toBe(600);
    expect(result.minWidth).toBe(100);
    expect(result.minHeight).toBe(50);
  });

  it("forwards quality, resize, convertSize, checkOrientation, maxWidth, maxHeight", () => {
    const result = buildCompressorOptions({
      ...BASE_SETTINGS,
      quality: 0.5,
      resize: "cover",
      convertSize: 1_000_000,
      checkOrientation: false,
      maxWidth: 1280,
      maxHeight: 720,
    });

    expect(result.quality).toBe(0.5);
    expect(result.resize).toBe("cover");
    expect(result.convertSize).toBe(1_000_000);
    expect(result.checkOrientation).toBe(false);
    expect(result.maxWidth).toBe(1280);
    expect(result.maxHeight).toBe(720);
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

describe("canEnableDownload", () => {
  it("returns true when not compressing and a compressed blob exists", () => {
    const blob = new Blob(["x"], { type: "image/webp" });

    const result = canEnableDownload({ isCompressing: false, compressedBlob: blob });

    expect(result).toBe(true);
  });

  it.each([
    [{ isCompressing: true, compressedBlob: new Blob(["x"]) }],
    [{ isCompressing: false, compressedBlob: null }],
    [{ isCompressing: true, compressedBlob: null }],
  ])("returns false when isCompressing or no blob (%j)", (input) => {
    const result = canEnableDownload(input);

    expect(result).toBe(false);
  });
});

interface FakeAnchor {
  href: string;
  download: string;
  click: ReturnType<typeof vi.fn>;
  remove: ReturnType<typeof vi.fn>;
}

const makeFakeAnchor = (): FakeAnchor => ({
  href: "",
  download: "",
  click: vi.fn(),
  remove: vi.fn(),
});

describe("triggerDownload", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("creates an anchor with the given filename and a Blob object URL, clicks it, then cleans up", () => {
    const anchor = makeFakeAnchor();
    const appendChild = vi.fn();
    const createElement = vi.fn((tag: string) => {
      if (tag !== "a") throw new Error(`unexpected tag ${tag}`);
      return anchor as unknown as HTMLAnchorElement;
    });
    const createObjectURL = vi.fn(() => "blob:fake-url");
    const revokeObjectURL = vi.fn();
    vi.stubGlobal("document", { createElement, body: { appendChild } });
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });
    const blob = new Blob(["data"], { type: "image/webp" });

    triggerDownload({ blob, filename: "photo_compressed.webp" });

    expect(createObjectURL).toHaveBeenCalledWith(blob);
    expect(anchor.href).toBe("blob:fake-url");
    expect(anchor.download).toBe("photo_compressed.webp");
    expect(appendChild).toHaveBeenCalledWith(anchor);
    expect(anchor.click).toHaveBeenCalledTimes(1);
    expect(anchor.remove).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:fake-url");
  });
});
