/**
 * PreToolUse: run `yarn lint` and `yarn typecheck` from the repo root.
 * On failure, deny the tool and surface command output to the model via permissionDecisionReason.
 *
 * Note: if Husky is configured in the project (e.g. pre-commit running lint/typecheck),
 * this hook is redundant — prefer Git hooks for local checks and omit this from settings.json.
 */

import { spawnSync } from "node:child_process";

import { deny, findRepoRoot, readStdinJson } from "./hooks-common.ts";

const REPO_ROOT = findRepoRoot();

interface YarnRunResult {
  ok: boolean;
  label: string;
  summary: string;
  output: string;
}

const runYarn = (script = "lint"): YarnRunResult => {
  const result = spawnSync("yarn", [script], {
    cwd: REPO_ROOT,
    encoding: "utf8",
    env: process.env,
    maxBuffer: 20 * 1024 * 1024,
  });

  const stdout = result.stdout ?? "";
  const stderr = result.stderr ?? "";
  const combined = [stdout, stderr].filter(Boolean).join("\n");
  const exitCode = result.status ?? 1;
  const signal = result.signal ? ` (signal ${result.signal})` : "";
  const isOK = exitCode === 0;

  return {
    ok: isOK,
    label: script,
    summary: isOK ? `yarn ${script} passed` : `yarn ${script} failed with exit ${exitCode}${signal}`,
    output: combined.trim() || "(no output)",
  };
};

readStdinJson(() => {
  const lint = runYarn("lint");
  if (!lint.ok) {
    deny(`Quality gate: ${lint.summary}.\n\n--- yarn lint ---\n${lint.output}`);
    return;
  }

  const typecheck = runYarn("typecheck");
  if (!typecheck.ok) {
    deny(`Quality gate: ${typecheck.summary}.\n\n--- yarn typecheck ---\n${typecheck.output}`);
    return;
  }

  process.exit(0);
});
