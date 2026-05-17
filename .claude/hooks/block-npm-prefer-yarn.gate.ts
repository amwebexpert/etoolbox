/**
 * PreToolUse: deny Bash tool invocations that run `npm` (prefer yarn).
 */

import { deny, readStdinJson } from "./hooks-common.ts";

const NPM_COMMAND = /^\s*npm(\s|$)/;

type PreToolUseInput = {
  tool_input?: {
    command?: string;
  };
};

readStdinJson((input) => {
  const command = (input as PreToolUseInput)?.tool_input?.command ?? "";
  if (NPM_COMMAND.test(command)) {
    deny('npm is blocked. Use yarn instead (e.g. "yarn add", "yarn typecheck"...).');
  }

  process.exit(0);
});
