import { logger } from "@lichens-innovation/ts-common/logger";
import type {
  SDKAssistantMessage,
  SDKResultMessage,
  SDKResultSuccess,
  SDKSystemMessage,
} from "@anthropic-ai/claude-agent-sdk";
import * as ClaudeAgentSdk from "@anthropic-ai/claude-agent-sdk";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

import { isNullish } from "@lichens-innovation/ts-common";
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
}

const logMessage = ({ msg, label }: LogMessageArgs): void => {
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
  }
};

interface RunAgentArgs {
  prompt: string;
  options?: AgentOptions;
  label: string;
}

type AgentFailureDetails = Record<string, unknown>;

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

interface FormatAgentFailureConsoleMessageArgs {
  label: string;
  details: AgentFailureDetails;
}

const formatAgentFailureConsoleMessage = ({ label, details }: FormatAgentFailureConsoleMessageArgs): string => {
  const subtype = typeof details.subtype === "string" ? details.subtype : undefined;
  const detailsReason = typeof details.reason === "string" ? details.reason : undefined;
  const reason = subtype
    ? (REASON_BY_SUBTYPE[subtype] ?? subtype)
    : detailsReason
      ? (REASON_BY_DETAILS[detailsReason] ?? detailsReason)
      : String(details.result ?? "unknown failure");
  const errors = Array.isArray(details.errors)
    ? details.errors.filter((entry): entry is string => typeof entry === "string")
    : [];
  const errorSuffix = errors.length > 0 ? `: ${errors.join("; ")}` : "";
  return `Agent "${label}" aborted — ${reason}${errorSuffix}`;
};

interface AbortOrchestratorOnAgentFailureArgs {
  label: string;
  details: AgentFailureDetails;
}

const abortOrchestratorOnAgentFailure = ({ label, details }: AbortOrchestratorOnAgentFailureArgs): never => {
  const agentLogger = getLoggerForLabel(label);
  const message = formatAgentFailureConsoleMessage({ label, details });
  logger.error(`Aborting orchestrator: ${message}`);
  agentLogger.error("Agent call failed", details);
  process.exit(1);
};

interface AbortOrchestratorOnSdkErrorArgs {
  label: string;
  error: unknown;
}

const abortOrchestratorOnSdkError = ({ label, error }: AbortOrchestratorOnSdkErrorArgs): never => {
  const agentLogger = getLoggerForLabel(label);
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[orchestrator] Agent "${label}" aborted — SDK error: ${message}`);
  agentLogger.error("Agent call failed with SDK error, aborting orchestrator.", { error: message });
  process.exit(1);
};

export const runAgent = async ({ prompt, options, label }: RunAgentArgs): Promise<SDKResultSuccess> => {
  try {
    for await (const msg of ClaudeAgentSdk.query({ prompt, options })) {
      logMessage({ msg, label });

      const rateLimitFailure = getRateLimitFailureDetails(msg);
      if (rateLimitFailure) {
        return abortOrchestratorOnAgentFailure({ label, details: rateLimitFailure });
      }

      if (msg.type !== "result") continue;
      if (msg.subtype === "success") return msg;

      return abortOrchestratorOnAgentFailure({ label, details: getAgentFailureDetails(msg) });
    }

    return abortOrchestratorOnAgentFailure({ label, details: getAgentFailureDetails(null) });
  } catch (error) {
    return abortOrchestratorOnSdkError({ label, error });
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

const getAgentFailureDetails = (result: SDKResultMessage | null): Record<string, unknown> => {
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

  return abortOrchestratorOnAgentFailure({
    label,
    details: { reason: "invalid structured output", error: parsed.error.message },
  });
};
