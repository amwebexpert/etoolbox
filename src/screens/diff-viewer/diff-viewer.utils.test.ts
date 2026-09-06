import { describe, expect, it } from "vitest";

import { computeDiffSummary } from "./diff-viewer.utils";

describe("computeDiffSummary", () => {
  it("returns zero added and zero removed for identical texts", () => {
    // arrange
    const originalText = "alpha\nbeta\ngamma";
    const modifiedText = "alpha\nbeta\ngamma";

    // act
    const summary = computeDiffSummary({
      originalText,
      modifiedText,
      ignoreWhitespace: false,
    });

    // assert
    expect(summary).toEqual({ addedLines: 0, removedLines: 0 });
  });

  it("counts a replaced line as one added and one removed", () => {
    // arrange
    const originalText = "alpha\nbeta\ngamma";
    const modifiedText = "alpha\nBETA\ngamma";

    // act
    const summary = computeDiffSummary({
      originalText,
      modifiedText,
      ignoreWhitespace: false,
    });

    // assert
    expect(summary).toEqual({ addedLines: 1, removedLines: 1 });
  });

  it("counts purely added lines without removals", () => {
    // arrange
    const originalText = "alpha\nbeta";
    const modifiedText = "alpha\nbeta\ngamma\ndelta";

    // act
    const summary = computeDiffSummary({
      originalText,
      modifiedText,
      ignoreWhitespace: false,
    });

    // assert
    expect(summary).toEqual({ addedLines: 2, removedLines: 0 });
  });

  it("counts purely removed lines without additions", () => {
    // arrange
    const originalText = "alpha\nbeta\ngamma\ndelta";
    const modifiedText = "alpha\nbeta";

    // act
    const summary = computeDiffSummary({
      originalText,
      modifiedText,
      ignoreWhitespace: false,
    });

    // assert
    expect(summary).toEqual({ addedLines: 0, removedLines: 2 });
  });

  it("counts whitespace-only changes when ignoreWhitespace is false", () => {
    // arrange
    const originalText = "alpha\nbeta";
    const modifiedText = "alpha  \nbeta";

    // act
    const summary = computeDiffSummary({
      originalText,
      modifiedText,
      ignoreWhitespace: false,
    });

    // assert
    expect(summary.addedLines + summary.removedLines).toBeGreaterThan(0);
  });

  it("ignores whitespace-only line changes when ignoreWhitespace is true", () => {
    // arrange
    const originalText = "alpha\nbeta";
    const modifiedText = "alpha  \nbeta";

    // act
    const summary = computeDiffSummary({
      originalText,
      modifiedText,
      ignoreWhitespace: true,
    });

    // assert
    expect(summary).toEqual({ addedLines: 0, removedLines: 0 });
  });

  it("still counts real content changes when ignoreWhitespace is true", () => {
    // arrange
    const originalText = "alpha\nbeta";
    const modifiedText = "alpha  \nBETA";

    // act
    const summary = computeDiffSummary({
      originalText,
      modifiedText,
      ignoreWhitespace: true,
    });

    // assert
    expect(summary).toEqual({ addedLines: 1, removedLines: 1 });
  });
});
