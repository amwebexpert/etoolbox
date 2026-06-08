import { describe, expect, it } from "vitest";

import { getImageDownloadFilename, getImageMetadata } from "./base64-image.utils";

describe("base64-image.utils", () => {
  describe("getImageMetadata", () => {
    it("returns mime, extension, size in bytes, and pretty-formatted size for a valid PNG data URI", () => {
      // Arrange
      const base64 = "iVBORw0KGgo="; // 12 chars -> ~9 bytes
      const input = `data:image/png;base64,${base64}`;

      // Act
      const result = getImageMetadata(input);

      // Assert
      expect(result).toEqual({
        mimeType: "image/png",
        ext: "png",
        base64,
        sizeBytes: 9,
        sizeFormatted: "9 B",
      });
    });

    it("returns mime, extension and size for a valid JPEG data URI", () => {
      // Arrange
      const base64 = "/9j/4AAQSkZJRg==";
      const input = `data:image/jpeg;base64,${base64}`;

      // Act
      const result = getImageMetadata(input);

      // Assert
      expect(result).toMatchObject({
        mimeType: "image/jpeg",
        ext: "jpg",
        base64,
      });
      expect(result?.sizeBytes).toBeGreaterThan(0);
      expect(typeof result?.sizeFormatted).toBe("string");
    });

    it.each`
      input
      ${""}
      ${"hello world"}
      ${"data:image/png"}
      ${"data:application/pdf;base64,JVBERi0xLjQK"}
      ${"data:audio/mp3;base64,SUQzAw=="}
    `("returns null for empty, malformed, or non-image input ($input)", ({ input }: { input: string }) => {
      // Arrange / Act
      const result = getImageMetadata(input);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("getImageDownloadFilename", () => {
    it.each`
      ext       | expected
      ${"png"}  | ${"image.png"}
      ${"jpg"}  | ${"image.jpg"}
      ${"gif"}  | ${"image.gif"}
      ${"webp"} | ${"image.webp"}
      ${"bmp"}  | ${"image.bmp"}
    `("builds image.$ext for extension $ext", ({ ext, expected }: { ext: string; expected: string }) => {
      // Arrange / Act
      const result = getImageDownloadFilename(ext);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
