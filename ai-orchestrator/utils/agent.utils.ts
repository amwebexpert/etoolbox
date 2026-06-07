import type { SDKAssistantMessage, SDKResultMessage, SDKSystemMessage } from "@anthropic-ai/claude-agent-sdk";
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
  let content = readFileSync(path.join(PROMPTS_DIR, name), "utf-8");
  for (const [key, value] of Object.entries(substitutions)) {
    content = content.replaceAll(`{{${key}}}`, value);
  }
  return content;
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

export const runAgent = async ({ prompt, options, label }: RunAgentArgs): Promise<SDKResultMessage | null> => {
  for await (const msg of ClaudeAgentSdk.query({ prompt, options })) {
    logMessage({ msg, label });
    if (msg.type === "result") {
      return msg;
    }
  }
  return null;
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
  const agentLogger = getLoggerForLabel(label);

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

  if (result === null || result.type !== "result" || result.subtype !== "success") {
    agentLogger.error("Agent call failed, aborting.", getAgentFailureDetails(result));
    process.exit(1);
  }

  const parsed = schema.safeParse(result.structured_output);
  if (!parsed.success) {
    agentLogger.error(`Agent returned invalid structured output: ${parsed.error.message}`);
    process.exit(1);
  }

  return parsed.data;
};
