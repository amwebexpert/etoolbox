import { describe, expect, it } from "vitest";

import {
  buildExportFilename,
  compressImage,
  computeCompressionRatio,
  formatFileSize,
  isValidImageFile,
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

describe("isValidImageFile", () => {
  it("returns true for image/png", () => {
    const file = { type: "image/png" } as File;
    expect(isValidImageFile(file)).toBe(true);
  });

  it("returns true for image/jpeg", () => {
    const file = { type: "image/jpeg" } as File;
    expect(isValidImageFile(file)).toBe(true);
  });

  it("returns true for image/webp", () => {
    const file = { type: "image/webp" } as File;
    expect(isValidImageFile(file)).toBe(true);
  });

  it("returns false for application/pdf", () => {
    const file = { type: "application/pdf" } as File;
    expect(isValidImageFile(file)).toBe(false);
  });

  it("returns false for text/plain", () => {
    const file = { type: "text/plain" } as File;
    expect(isValidImageFile(file)).toBe(false);
  });

  it("returns false for empty MIME type", () => {
    const file = { type: "" } as File;
    expect(isValidImageFile(file)).toBe(false);
  });
});

describe("compressImage", () => {
  it("is an exported function", () => {
    expect(typeof compressImage).toBe("function");
  });

  it("returns a Promise", () => {
    // Invoke with a stub File; compressorjs will fail asynchronously on a
    // non-image blob, but we only verify the Promise contract here.
    const stub = new File([new Uint8Array([0])], "stub.png", { type: "image/png" });
    const result = compressImage(stub);
    expect(result).toBeInstanceOf(Promise);
    // Swallow rejection so the test does not surface an unhandled rejection.
    result.catch(() => undefined);
  });
});
