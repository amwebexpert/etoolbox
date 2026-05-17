import { describe, expect, it } from "vitest";

import { computeDiffSummary } from "./diff-viewer.utils";

describe("computeDiffSummary", () => {
  it("returns zero added and zero removed for identical texts", () => {
    const summary = computeDiffSummary({
      originalText: "alpha\nbeta\ngamma",
      modifiedText: "alpha\nbeta\ngamma",
      ignoreWhitespace: false,
    });

    expect(summary).toEqual({ addedLines: 0, removedLines: 0 });
  });

  it("counts a replaced line as one added and one removed", () => {
    const summary = computeDiffSummary({
      originalText: "alpha\nbeta\ngamma",
      modifiedText: "alpha\nBETA\ngamma",
      ignoreWhitespace: false,
    });

    expect(summary).toEqual({ addedLines: 1, removedLines: 1 });
  });

  it("counts purely added lines without removals", () => {
    const summary = computeDiffSummary({
      originalText: "alpha\nbeta",
      modifiedText: "alpha\nbeta\ngamma\ndelta",
      ignoreWhitespace: false,
    });

    expect(summary).toEqual({ addedLines: 2, removedLines: 0 });
  });

  it("counts purely removed lines without additions", () => {
    const summary = computeDiffSummary({
      originalText: "alpha\nbeta\ngamma\ndelta",
      modifiedText: "alpha\nbeta",
      ignoreWhitespace: false,
    });

    expect(summary).toEqual({ addedLines: 0, removedLines: 2 });
  });

  it("counts whitespace-only changes when ignoreWhitespace is false", () => {
    const summary = computeDiffSummary({
      originalText: "alpha\nbeta",
      modifiedText: "alpha  \nbeta",
      ignoreWhitespace: false,
    });

    expect(summary.addedLines + summary.removedLines).toBeGreaterThan(0);
  });

  it("ignores whitespace-only line changes when ignoreWhitespace is true", () => {
    const summary = computeDiffSummary({
      originalText: "alpha\nbeta",
      modifiedText: "alpha  \nbeta",
      ignoreWhitespace: true,
    });

    expect(summary).toEqual({ addedLines: 0, removedLines: 0 });
  });

  it("still counts real content changes when ignoreWhitespace is true", () => {
    const summary = computeDiffSummary({
      originalText: "alpha\nbeta",
      modifiedText: "alpha  \nBETA",
      ignoreWhitespace: true,
    });

    expect(summary).toEqual({ addedLines: 1, removedLines: 1 });
  });
});
