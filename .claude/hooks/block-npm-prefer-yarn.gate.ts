/**
 * PreToolUse: deny Bash tool invocations that run `npm` (prefer yarn).
 */

import { deny, PreToolUseInput, readStdinJson } from "./hooks-common.ts";

const REGEX_NPM_COMMAND = /^\s*npm(\s|$)/;

readStdinJson((input) => {
  const command = (input as PreToolUseInput)?.tool_input?.command ?? "";
  if (REGEX_NPM_COMMAND.test(command)) {
    deny('npm is blocked. Use yarn instead (e.g. "yarn add", "yarn typecheck"...).');
  }

  process.exit(0);
});
