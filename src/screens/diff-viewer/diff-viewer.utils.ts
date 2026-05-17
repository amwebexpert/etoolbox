import { diffLines } from "diff";

export interface DiffSummary {
  addedLines: number;
  removedLines: number;
}

export interface ComputeDiffSummaryArgs {
  originalText: string;
  modifiedText: string;
  ignoreWhitespace: boolean;
}

export const computeDiffSummary = ({
  originalText,
  modifiedText,
  ignoreWhitespace,
}: ComputeDiffSummaryArgs): DiffSummary => {
  const changes = diffLines(originalText, modifiedText, {
    ignoreWhitespace,
    ignoreNewlineAtEof: true,
  });

  let addedLines = 0;
  let removedLines = 0;
  for (const change of changes) {
    if (change.added) {
      addedLines += change.count ?? 0;
      continue;
    }
    if (change.removed) {
      removedLines += change.count ?? 0;
    }
  }

  return { addedLines, removedLines };
};
