import { isBlank } from "@lichens-innovation/ts-common";
import { homedir } from "node:os";
import path from "node:path";

const PLAN_FILE_HINT = "Set PLAN_FILE=~/ai-orchestrator-plans/<repo-slug>-<feature-slug>.json";

const expandTilde = (filePath: string): string => {
  if (filePath === "~") {
    return homedir();
  }

  if (filePath.startsWith("~/") || filePath.startsWith("~\\")) {
    return path.join(homedir(), filePath.slice(2));
  }

  return filePath;
};

export const resolvePlanFile = (): string => {
  const raw = process.env.PLAN_FILE;
  if (isBlank(raw)) {
    throw new Error(`PLAN_FILE is required. ${PLAN_FILE_HINT}`);
  }

  return path.resolve(expandTilde(raw.trim()));
};
