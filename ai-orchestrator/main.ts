import { logger } from "@lichens-innovation/ts-common/logger";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Orchestrator } from "./orchestrator.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_DIR = path.resolve(__dirname, "..");
const PLAN_FILE = path.join(__dirname, "plan.json");

const main = async (): Promise<void> => {
  const orchestrator = new Orchestrator({ planFile: PLAN_FILE, repoDir: REPO_DIR });
  await orchestrator.run();
};

void main().catch((error: unknown) => {
  logger.error("Orchestrator failed", { error });
  process.exit(1);
});
