import { describe, expect, it } from "vitest";

import { escapeHtml, unescapeHtml } from "./html.utils";

describe("html.utils", () => {
  describe("unescapeHtml", () => {
    it.each`
      input       | expected
      ${"&amp;"}  | ${"&"}
      ${"&lt;"}   | ${"<"}
      ${"&gt;"}   | ${">"}
      ${"&quot;"} | ${'"'}
      ${"&#39;"}  | ${"'"}
      ${"&#x27;"} | ${"'"}
    `("unescapes named and numeric entities ($input → $expected)", ({ input, expected }) => {
      expect(unescapeHtml(input)).toBe(expected);
    });

    it("returns empty string for empty input", () => {
      expect(unescapeHtml("")).toBe("");
    });

    it("leaves plain text unchanged", () => {
      expect(unescapeHtml("hello world")).toBe("hello world");
    });

    it("unescapes multiple entities in one string", () => {
      expect(unescapeHtml("a &amp; b &lt; c &gt; d")).toBe("a & b < c > d");
    });

    it("leaves entities not handled by the pattern unchanged", () => {
      expect(unescapeHtml("&nbsp;")).toBe("&nbsp;");
    });

    it("round-trips with escapeHtml for typical user content", () => {
      const original = "Label: <tag attr=\"v\"> & 'mixed'";
      expect(unescapeHtml(escapeHtml(original))).toBe(original);
    });

    it("round-trips escaped markup back to safe escaped form", () => {
      const escaped = "&lt;a href=&quot;https://example.com&quot;&gt;link &amp; text&lt;/a&gt;";
      expect(escapeHtml(unescapeHtml(escaped))).toBe(escaped);
    });
  });

  describe("escapeHtml", () => {
    it("returns empty string for empty input", () => {
      expect(escapeHtml("")).toBe("");
    });

    it("leaves plain text unchanged", () => {
      expect(escapeHtml("hello world")).toBe("hello world");
    });

    it("escapes ampersand", () => {
      expect(escapeHtml("a & b")).toBe("a &amp; b");
    });

    it("escapes angle brackets", () => {
      expect(escapeHtml("<div>")).toBe("&lt;div&gt;");
    });

    it("escapes double quotes", () => {
      expect(escapeHtml('say "hi"')).toBe("say &quot;hi&quot;");
    });

    it("escapes single quotes", () => {
      expect(escapeHtml("it's")).toBe("it&#39;s");
    });

    it("escapes all special characters in one string", () => {
      expect(escapeHtml('<a href="x">y & z\'s</a>')).toBe("&lt;a href=&quot;x&quot;&gt;y &amp; z&#39;s&lt;/a&gt;");
    });

    it("preserves characters that do not need escaping", () => {
      expect(escapeHtml("café 你好")).toBe("café 你好");
    });
  });
});
