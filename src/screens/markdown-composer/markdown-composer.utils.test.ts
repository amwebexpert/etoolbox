import { describe, expect, it } from "vitest";

import { parseJsonDataText } from "./markdown-composer.utils";

describe("parseJsonDataText", () => {
  it("returns undefined data with no error for empty input", () => {
    // arrange
    const input = "";

    // act
    const result = parseJsonDataText(input);

    // assert
    expect(result).toEqual({ data: undefined });
  });

  it("returns undefined data with no error for whitespace-only input", () => {
    // arrange
    const input = "   \n\t  ";

    // act
    const result = parseJsonDataText(input);

    // assert
    expect(result).toEqual({ data: undefined });
  });

  it("parses a valid JSON object", () => {
    // arrange
    const input = '{"name":"world","count":2}';

    // act
    const result = parseJsonDataText(input);

    // assert
    expect(result.errorMessage).toBeUndefined();
    expect(result.data).toEqual({ name: "world", count: 2 });
  });

  it("parses a valid JSON array", () => {
    // arrange
    const input = "[1, 2, 3]";

    // act
    const result = parseJsonDataText(input);

    // assert
    expect(result.errorMessage).toBeUndefined();
    expect(result.data).toEqual([1, 2, 3]);
  });

  it("returns an error message for malformed JSON", () => {
    // arrange
    const input = "{ invalid";

    // act
    const result = parseJsonDataText(input);

    // assert
    expect(result.data).toBeUndefined();
    expect(result.errorMessage).toBeDefined();
    expect(result.errorMessage?.length ?? 0).toBeGreaterThan(0);
  });
});
