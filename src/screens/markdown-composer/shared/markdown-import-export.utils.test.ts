import { describe, expect, it } from "vitest";

import { shouldConfirmBeforeImport } from "./markdown-import-export.utils";

interface ShouldConfirmBeforeImportCase {
  currentMarkdown: string;
  expected: boolean;
}

describe("shouldConfirmBeforeImport", () => {
  it.each`
    currentMarkdown         | expected
    ${""}                   | ${false}
    ${"# Existing content"} | ${true}
  `(
    "returns $expected when current markdown is $currentMarkdown",
    ({ currentMarkdown, expected }: ShouldConfirmBeforeImportCase) => {
      // act
      const result = shouldConfirmBeforeImport(currentMarkdown);

      // assert
      expect(result).toBe(expected);
    }
  );
});
