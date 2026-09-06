import type {
  SDKAssistantMessage,
  SDKResultMessage,
  SDKResultSuccess,
  SDKSystemMessage,
} from "@anthropic-ai/claude-agent-sdk";
import * as ClaudeAgentSdk from "@anthropic-ai/claude-agent-sdk";
import { isNullish } from "@lichens-innovation/ts-common";
import { logger } from "@lichens-innovation/ts-common/logger";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

import { getLoggerForLabel } from "./agent-logger.utils.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROMPTS_DIR = path.join(__dirname, "..", "prompts");

interface LoadPromptArgs {
  name: string;
  substitutions: Record<string, string>;
}

export const loadPrompt = ({ name, substitutions }: LoadPromptArgs): string => {
  const raw = readFileSync(path.join(PROMPTS_DIR, name), "utf-8");
  return Object.entries(substitutions).reduce((acc, [key, value]) => acc.replaceAll(`{{${key}}}`, value), raw);
};

type AgentOptions = Parameters<typeof ClaudeAgentSdk.query>[0]["options"];

const formatInput = (input: unknown): string =>
  JSON.stringify(input, (_, v) => (typeof v === "string" && v.length > 2000 ? `${v.slice(0, 2000)}…` : v));

interface LogMessageArgs {
  msg: ClaudeAgentSdk.SDKMessage;
  label: string;
  assistantTurnCount: number;
  maxTurns?: number;
  hasWarnedTurnBudget: { value: boolean };
}

const logMessage = ({ msg, label, assistantTurnCount, maxTurns, hasWarnedTurnBudget }: LogMessageArgs): void => {
  const agentLogger = getLoggerForLabel(label);

  if (msg.type === "system") {
    const sys = msg as SDKSystemMessage;
    agentLogger.info(`[${label}] INIT model=${sys.model} tools=[${sys.tools?.join(", ") ?? ""}]`);
    return;
  }

  if (msg.type === "assistant") {
    const asst = msg as SDKAssistantMessage;
    for (const block of asst.message.content) {
      if (block.type === "text") {
        const text = block.text.slice(0, 2000);
        agentLogger.info(`[${label}] > ${text}`);
      } else if (block.type === "tool_use") {
        agentLogger.info(`[${label}] CALL ${block.name} ${formatInput(block.input)}`);
      }
    }

    if (
      !isNullish(maxTurns) &&
      maxTurns > 0 &&
      !hasWarnedTurnBudget.value &&
      assistantTurnCount >= Math.floor(maxTurns * 0.8)
    ) {
      hasWarnedTurnBudget.value = true;
      const warning = `[${label}] Approaching turn budget: ${assistantTurnCount}/${maxTurns} turns (~80%)`;
      logger.warn(warning);
      agentLogger.warn(warning);
    }
  }
};

interface RunAgentArgs {
  prompt: string;
  options?: AgentOptions;
  label: string;
}

type AgentFailureDetails = Record<string, unknown>;

export class AgentFailureError extends Error {
  readonly label: string;
  readonly details: AgentFailureDetails;

  constructor({ label, details, message }: { label: string; details: AgentFailureDetails; message: string }) {
    super(message);
    this.name = "AgentFailureError";
    this.label = label;
    this.details = details;
  }
}

const REASON_BY_SUBTYPE: Record<string, string> = {
  error_max_turns: "maximum turn limit reached (token/usage budget may be exhausted)",
  error_max_budget_usd: "maximum USD budget exceeded",
  error_during_execution: "error during execution",
  error_max_structured_output_retries: "structured output retry limit exceeded",
};

const REASON_BY_DETAILS: Record<string, string> = {
  rate_limit_exceeded: "Claude API rate/session limit exceeded",
};

const getRateLimitFailureDetails = (msg: ClaudeAgentSdk.SDKMessage): AgentFailureDetails | null => {
  if (msg.type === "rate_limit_event" && msg.rate_limit_info.status === "rejected") {
    const { rateLimitType, resetsAt } = msg.rate_limit_info;
    return {
      reason: "rate_limit_exceeded",
      rateLimitType,
      resetsAt: typeof resetsAt === "number" ? new Date(resetsAt).toISOString() : undefined,
    };
  }

  if (msg.type === "assistant") {
    const asst = msg as SDKAssistantMessage;
    if (asst.error === "rate_limit") {
      const limitText = asst.message.content
        .filter((block): block is { type: "text"; text: string } => block.type === "text")
        .map((block) => block.text)
        .find((text) => /hit your (session )?limit/i.test(text));
      return {
        reason: "rate_limit_exceeded",
        assistantError: asst.error,
        message: limitText,
      };
    }
  }

  return null;
};

const resolveAgentFailureReason = (details: AgentFailureDetails): string => {
  const subtype = typeof details.subtype === "string" ? details.subtype : undefined;
  if (subtype) {
    return REASON_BY_SUBTYPE[subtype] ?? subtype;
  }

  const detailsReason = typeof details.reason === "string" ? details.reason : undefined;
  if (detailsReason) {
    return REASON_BY_DETAILS[detailsReason] ?? detailsReason;
  }

  return String(details.result ?? "unknown failure");
};

interface FormatAgentFailureConsoleMessageArgs {
  label: string;
  details: AgentFailureDetails;
}

const formatAgentFailureConsoleMessage = ({ label, details }: FormatAgentFailureConsoleMessageArgs): string => {
  const reason = resolveAgentFailureReason(details);
  const errors = Array.isArray(details.errors)
    ? details.errors.filter((entry): entry is string => typeof entry === "string")
    : [];
  const errorSuffix = errors.length > 0 ? `: ${errors.join("; ")}` : "";
  return `Agent "${label}" aborted — ${reason}${errorSuffix}`;
};

interface ThrowAgentFailureArgs {
  label: string;
  details: AgentFailureDetails;
}

const throwAgentFailure = ({ label, details }: ThrowAgentFailureArgs): never => {
  const agentLogger = getLoggerForLabel(label);
  const message = formatAgentFailureConsoleMessage({ label, details });
  logger.error(message);
  agentLogger.error("Agent call failed", details);
  throw new AgentFailureError({ label, details, message });
};

interface ThrowSdkErrorArgs {
  label: string;
  error: unknown;
}

const throwSdkError = ({ label, error }: ThrowSdkErrorArgs): never => {
  const agentLogger = getLoggerForLabel(label);
  const message = error instanceof Error ? error.message : String(error);
  logger.error(`Agent "${label}" aborted — SDK error: ${message}`);
  agentLogger.error("Agent call failed with SDK error", { error: message });
  throw new AgentFailureError({
    label,
    details: { reason: "sdk_error", error: message },
    message: `Agent "${label}" aborted — SDK error: ${message}`,
  });
};

interface LogAgentUsageArgs {
  label: string;
  numTurns?: number;
  totalCostUsd?: number;
  outcome: "success" | "failure";
}

const logAgentUsage = ({ label, numTurns, totalCostUsd, outcome }: LogAgentUsageArgs): void => {
  const agentLogger = getLoggerForLabel(label);
  const turnsPart = isNullish(numTurns) ? "turns=unknown" : `turns=${numTurns}`;
  const costPart = isNullish(totalCostUsd) ? "cost=unknown" : `cost_usd=${totalCostUsd.toFixed(4)}`;
  const message = `[${label}] ${outcome}: ${turnsPart} ${costPart}`;
  if (outcome === "success") {
    logger.info(message);
    agentLogger.info(message);
  } else {
    logger.warn(message);
    agentLogger.warn(message);
  }
};

const getUsageFromResult = (
  result: SDKResultMessage | null
): { numTurns?: number; totalCostUsd?: number } => {
  if (isNullish(result) || result.type !== "result") {
    return {};
  }

  return {
    numTurns: result.num_turns,
    totalCostUsd: result.total_cost_usd,
  };
};

export const runAgent = async ({ prompt, options, label }: RunAgentArgs): Promise<SDKResultSuccess> => {
  const maxTurns = options?.maxTurns;
  const hasWarnedTurnBudget = { value: false };
  let assistantTurnCount = 0;

  try {
    for await (const msg of ClaudeAgentSdk.query({ prompt, options })) {
      if (msg.type === "assistant") {
        assistantTurnCount += 1;
      }

      logMessage({ msg, label, assistantTurnCount, maxTurns, hasWarnedTurnBudget });

      const rateLimitFailure = getRateLimitFailureDetails(msg);
      if (rateLimitFailure) {
        logAgentUsage({ label, outcome: "failure" });
        return throwAgentFailure({ label, details: rateLimitFailure });
      }

      if (msg.type !== "result") continue;

      const usage = getUsageFromResult(msg);
      if (msg.subtype === "success") {
        logAgentUsage({ label, ...usage, outcome: "success" });
        return msg;
      }

      logAgentUsage({ label, ...usage, outcome: "failure" });
      return throwAgentFailure({ label, details: getAgentFailureDetails(msg) });
    }

    logAgentUsage({ label, numTurns: assistantTurnCount, outcome: "failure" });
    return throwAgentFailure({ label, details: getAgentFailureDetails(null) });
  } catch (error) {
    if (error instanceof AgentFailureError) {
      throw error;
    }

    return throwSdkError({ label, error });
  }
};

interface RunTypedAgentArgs<T> {
  label: string;
  prompt: string;
  schema: z.ZodSchema<T>;
  options?: AgentOptions;
}

const toSdkJsonSchema = <T>(schema: z.ZodSchema<T>): Record<string, unknown> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { $schema: _ignored, ...rest } = z.toJSONSchema(schema) as Record<string, unknown>;
  return rest;
};

const getAgentFailureDetails = (result: SDKResultMessage | null): AgentFailureDetails => {
  if (result?.type === "result" && result.subtype !== "success") {
    return { subtype: result.subtype, numTurns: result.num_turns, errors: result.errors };
  }

  if (isNullish(result)) {
    return { result: "no result" };
  }

  return { result: "unexpected message type" };
};

export const runTypedAgent = async <T>({ prompt, schema, options, label }: RunTypedAgentArgs<T>): Promise<T> => {
  const result = await runAgent({
    prompt,
    label,
    options: {
      ...options,
      outputFormat: {
        type: "json_schema",
        schema: toSdkJsonSchema(schema),
      },
    },
  });

  const parsed = schema.safeParse(result.structured_output);
  if (parsed.success) {
    return parsed.data;
  }

  return throwAgentFailure({
    label,
    details: { reason: "invalid structured output", error: parsed.error.message },
  });
};
