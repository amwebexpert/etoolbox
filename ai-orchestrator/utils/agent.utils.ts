import * as ClaudeAgentSdk from "@anthropic-ai/claude-agent-sdk";
import type { SDKResultMessage } from "@anthropic-ai/claude-agent-sdk";
import { logger } from "@lichens-innovation/ts-common/logger";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

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

interface RunAgentArgs {
  prompt: string;
  options?: AgentOptions;
}

export const runAgent = async ({ prompt, options }: RunAgentArgs): Promise<SDKResultMessage | null> => {
  for await (const msg of ClaudeAgentSdk.query({ prompt, options })) {
    if (msg.type === "result") {
      return msg;
    }
  }
  return null;
};

interface RunTypedAgentArgs<T> {
  prompt: string;
  schema: z.ZodSchema<T>;
  options?: AgentOptions;
}

const toSdkJsonSchema = <T>(schema: z.ZodSchema<T>): Record<string, unknown> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { $schema: _ignored, ...rest } = z.toJSONSchema(schema) as Record<string, unknown>;
  return rest;
};

export const runTypedAgent = async <T>({ prompt, schema, options }: RunTypedAgentArgs<T>): Promise<T> => {
  const result = await runAgent({
    prompt,
    options: {
      ...options,
      outputFormat: {
        type: "json_schema",
        schema: toSdkJsonSchema(schema),
      },
    },
  });

  if (result === null || result.type !== "result" || result.subtype !== "success") {
    logger.error("Agent call failed, aborting.");
    process.exit(1);
  }

  const parsed = schema.safeParse(result.structured_output);
  if (!parsed.success) {
    logger.error(`Agent returned invalid structured output: ${parsed.error.message}`);
    process.exit(1);
  }

  return parsed.data;
};
