import { describe, expect, it } from "vitest";

import { isImageMimeType, mimeToExt, parseDataUri } from "./base64-image.utils";

describe("base64-image.utils", () => {
  describe("parseDataUri", () => {
    it.each`
      input                                          | expectedMime         | expectedBase64    | expectedExt
      ${"data:image/png;base64,iVBORw0KGgo="}        | ${"image/png"}       | ${"iVBORw0KGgo="} | ${"png"}
      ${"data:image/jpeg;base64,/9j/4AAQSkZJRg=="}   | ${"image/jpeg"}      | ${"/9j/4AAQSkZJRg=="} | ${"jpg"}
      ${"data:image/svg+xml;base64,PHN2Zy8+"}        | ${"image/svg+xml"}   | ${"PHN2Zy8+"}     | ${"svg"}
      ${"data:application/pdf;base64,JVBERi0xLjQK"}  | ${"application/pdf"} | ${"JVBERi0xLjQK"} | ${"pdf"}
    `(
      "parses a well-formed data URI ($input)",
      ({
        input,
        expectedMime,
        expectedBase64,
        expectedExt,
      }: {
        input: string;
        expectedMime: string;
        expectedBase64: string;
        expectedExt: string;
      }) => {
        // Arrange / Act
        const result = parseDataUri(input);

        // Assert
        expect(result).toEqual({ mimeType: expectedMime, base64: expectedBase64, ext: expectedExt });
      }
    );

    it.each`
      input
      ${""}
      ${"hello world"}
      ${"data:image/png"}
      ${"data:;base64,abc"}
      ${"image/png;base64,abc"}
      ${"data:image/png;base64,"}
    `("returns null for non-matching input ($input)", ({ input }: { input: string }) => {
      // Arrange / Act
      const result = parseDataUri(input);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("isImageMimeType", () => {
    it.each`
      mimeType
      ${"image/png"}
      ${"image/jpeg"}
      ${"image/jpg"}
      ${"image/gif"}
      ${"image/webp"}
      ${"image/bmp"}
    `("returns true for image MIME type $mimeType", ({ mimeType }: { mimeType: string }) => {
      // Arrange / Act
      const result = isImageMimeType(mimeType);

      // Assert
      expect(result).toBe(true);
    });

    it.each`
      mimeType
      ${"application/pdf"}
      ${"audio/mp3"}
    `("returns false for non-image MIME type $mimeType", ({ mimeType }: { mimeType: string }) => {
      // Arrange / Act
      const result = isImageMimeType(mimeType);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("mimeToExt", () => {
    it.each`
      mimeType              | expected
      ${"image/png"}        | ${"png"}
      ${"image/jpeg"}       | ${"jpg"}
      ${"image/jpg"}        | ${"jpg"}
      ${"image/gif"}        | ${"gif"}
      ${"image/webp"}       | ${"webp"}
      ${"image/bmp"}        | ${"bmp"}
      ${"image/svg+xml"}    | ${"svg"}
      ${"application/pdf"}  | ${"pdf"}
      ${"application/json"} | ${"json"}
      ${"audio/mp3"}        | ${"mp3"}
    `("maps $mimeType to extension $expected", ({ mimeType, expected }: { mimeType: string; expected: string }) => {
      // Arrange / Act
      const result = mimeToExt(mimeType);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
