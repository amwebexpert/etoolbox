// Per-agent log files: logs/implementer-{issueId}.log, logs/reviewer-{issueId}.log, logs/planner.log, logs/merger.log
import { isNullish } from "@lichens-innovation/ts-common";
import type { Logger } from "@lichens-innovation/ts-common/logger";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pino from "pino";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MESSAGE_KEY = "msg";

const basePinoOptions: pino.LoggerOptions = {
  timestamp: pino.stdTimeFunctions.isoTime,
  messageKey: MESSAGE_KEY,
};

const createPrettyFileTransport = (logFile: string): pino.DestinationStream => {
  try {
    return pino.transport({
      target: "pino-pretty",
      options: {
        colorize: false,
        destination: logFile,
        append: true,
        mkdir: true,
        translateTime: "SYS:standard",
        messageKey: MESSAGE_KEY,
      },
    });
  } catch (error) {
    console.warn(`pino-pretty unavailable for "${logFile}", falling back to JSON`, error);
    mkdirSync(path.dirname(logFile), { recursive: true });
    return pino.destination({ dest: logFile, append: true, mkdir: true });
  }
};

const buildLoggerApi = (pinoInstance: pino.Logger): Logger => {
  const logAtLevel =
    (level: "trace" | "debug" | "info" | "warn" | "error" | "fatal") =>
    (message: string, payload?: Record<string, unknown>): void => {
      if (isNullish(payload)) {
        pinoInstance[level](message);
      } else {
        pinoInstance[level](payload, message);
      }
    };

  return {
    trace: logAtLevel("trace"),
    debug: logAtLevel("debug"),
    info: logAtLevel("info"),
    warn: logAtLevel("warn"),
    error: logAtLevel("error"),
    fatal: logAtLevel("fatal"),
    log: logAtLevel("info"),
  };
};

const createFileLogger = (logFile: string): Logger => buildLoggerApi(pino(basePinoOptions, createPrettyFileTransport(logFile)));

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

  const instance = createFileLogger(file);
  loggerCache.set(file, instance);
  return instance;
};
