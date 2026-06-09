/**
 * PreToolUse: deny Bash tool invocations that run `npm` or `yarn` (prefer bun).
 */

import { deny, PreToolUseInput, readStdinJson } from "./hooks-common.ts";

const REGEX_BLOCKED_PACKAGE_MANAGER = /^\s*(npm|yarn)(\s|$)/;

readStdinJson((input) => {
  const command = (input as PreToolUseInput)?.tool_input?.command ?? "";
  if (REGEX_BLOCKED_PACKAGE_MANAGER.test(command)) {
    deny('npm and yarn are blocked. Use bun instead (e.g. "bun add", "bun run typecheck"...).');
  }

  process.exit(0);
});
