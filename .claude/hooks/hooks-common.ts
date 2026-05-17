import fs from "node:fs";
import path from "node:path";

export interface PreToolUseInput {
  tool_input?: {
    command?: string;
  };
}

const MAX_REASON_LENGTH = 12_000;

export const findRepoRoot = (): string => {
  const fromEnv = process.env.CLAUDE_PROJECT_DIR?.trim();
  if (fromEnv && fs.existsSync(path.join(fromEnv, "package.json"))) {
    return fromEnv;
  }

  let dir = process.cwd();
  while (true) {
    if (fs.existsSync(path.join(dir, "package.json"))) {
      return dir;
    }

    const parent = path.dirname(dir);
    if (parent === dir) break;

    dir = parent;
  }

  return path.resolve(process.cwd(), "..");
};

const truncate = (text = "", max = MAX_REASON_LENGTH): string => {
  const s = text.trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max)}\n\n…(truncated, ${s.length} chars total)`;
};

export const deny = (reason = ""): never => {
  const payload = {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: truncate(reason),
    },
  };
  process.stdout.write(JSON.stringify(payload));

  process.exit(0);
};

export const readStdinJson = (onParsed: (input: unknown) => void): void => {
  const chunks: Buffer[] = [];

  process.stdin.on("data", (d) => chunks.push(d));
  process.stdin.on("end", () => {
    const raw = Buffer.concat(chunks).toString().trim();
    if (!raw) process.exit(0);

    try {
      const input: unknown = JSON.parse(raw);
      onParsed(input);
    } catch (error) {
      console.error("[readStdinJson] problem", { error, raw });
      process.exit(0);
    }
  });
};
