import { describe, expect, it } from "vitest";

import { shouldConfirmBeforeImport } from "./markdown-import-export.utils";

describe("shouldConfirmBeforeImport", () => {
  it.each([
    { currentMarkdown: "", expected: false },
    { currentMarkdown: "# Existing content", expected: true },
  ])("returns $expected when current markdown is $currentMarkdown", ({ currentMarkdown, expected }) => {
    // act
    const result = shouldConfirmBeforeImport(currentMarkdown);

    // assert
    expect(result).toBe(expected);
  });
});
