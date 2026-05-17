// Per-agent log files: logs/implementer-{issueId}.log, logs/reviewer-{issueId}.log, logs/planner.log, logs/merger.log
import { isNullish } from "@lichens-innovation/ts-common";
import { createLogger, type Logger } from "@lichens-innovation/ts-common/logger";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let logDir = path.join(__dirname, "..", "logs");

export const setAgentLogDir = (dir: string): void => {
  logDir = dir;
  loggerCache.clear();
};

export const labelToLogFile = (label: string): string => {
  if (label.startsWith("impl:")) {
    return path.join(logDir, `implementer-${label.slice(5)}.log`);
  }

  if (label.startsWith("review:")) {
    return path.join(logDir, `reviewer-${label.slice(7)}.log`);
  }

  if (["planner", "merger"].includes(label)) {
    return path.join(logDir, `${label}.log`);
  }

  return path.join(logDir, `${label.replaceAll(":", "-")}.log`);
};

export const labelToSdkDebugFile = (label: string): string => labelToLogFile(label).replace(/\.log$/, "-sdk-debug.log");

const loggerCache = new Map<string, Logger>();

export const getLoggerForLabel = (label: string): Logger => {
  const file = labelToLogFile(label);
  const cached = loggerCache.get(file);
  if (!isNullish(cached)) {
    return cached;
  }

  const instance = createLogger({ logFile: file });
  loggerCache.set(file, instance);
  return instance;
};
