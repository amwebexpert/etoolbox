import { describe, expect, it } from "vitest";

import { parseJsonDataText } from "./markdown-composer.utils";

describe("parseJsonDataText", () => {
  it("returns undefined data with no error for empty input", () => {
    const result = parseJsonDataText("");

    expect(result).toEqual({ data: undefined });
  });

  it("returns undefined data with no error for whitespace-only input", () => {
    const result = parseJsonDataText("   \n\t  ");

    expect(result).toEqual({ data: undefined });
  });

  it("parses a valid JSON object", () => {
    const result = parseJsonDataText('{"name":"world","count":2}');

    expect(result.errorMessage).toBeUndefined();
    expect(result.data).toEqual({ name: "world", count: 2 });
  });

  it("parses a valid JSON array", () => {
    const result = parseJsonDataText("[1, 2, 3]");

    expect(result.errorMessage).toBeUndefined();
    expect(result.data).toEqual([1, 2, 3]);
  });

  it("returns an error message for malformed JSON", () => {
    const result = parseJsonDataText("{ invalid");

    expect(result.data).toBeUndefined();
    expect(result.errorMessage).toBeDefined();
    expect(result.errorMessage?.length ?? 0).toBeGreaterThan(0);
  });
});
