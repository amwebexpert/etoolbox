/**
 * PreToolUse: deny git push --force / -f / --force-with-lease to protected branches.
 */

import { execSync } from "node:child_process";
import { deny, PreToolUseInput, readStdinJson } from "./hooks-common.ts";

const PROTECTED_BRANCHES = ["main", "master", "develop"];
const REGEX_GIT_PUSH = /\bgit\s+push\b/;
const REGEX_FORCE_FLAG = /\s(--force|--force-with-lease|-f)\b/;

const getCurrentBranch = (): string => {
  return execSync("git symbolic-ref --short HEAD", { encoding: "utf8" }).trim();
};

const getTargetBranch = (command: string): string => {
  for (const branch of PROTECTED_BRANCHES) {
    if (new RegExp(`(\\s|:)${branch}(\\s|$)`).test(command)) {
      return branch;
    }
  }
  return getCurrentBranch();
};

readStdinJson((input) => {
  const command = (input as PreToolUseInput)?.tool_input?.command ?? "";

  if (!REGEX_GIT_PUSH.test(command) || !REGEX_FORCE_FLAG.test(command)) {
    process.exit(0);
  }

  const target = getTargetBranch(command);
  if (PROTECTED_BRANCHES.includes(target)) {
    deny(
      "Force-pushing to protected branches (main, master, develop) is blocked. Use a regular push or create a PR instead."
    );
  }

  process.exit(0);
});
