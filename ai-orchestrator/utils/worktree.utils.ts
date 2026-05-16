import * as ClaudeAgentSdk from "@anthropic-ai/claude-agent-sdk";
import { logger } from "@lichens-innovation/ts-common/logger";
import { execSync } from "node:child_process";
import { symlinkSync } from "node:fs";

type ClaudeAgentSdkWithWorktrees = typeof ClaudeAgentSdk & {
  createWorktree: (args: { name: string; dir: string }) => Promise<{ path: string }>;
  removeWorktree: (args: { name: string; dir: string; force?: boolean }) => Promise<void>;
};

const { createWorktree, removeWorktree } = ClaudeAgentSdk as unknown as ClaudeAgentSdkWithWorktrees;

interface WithWorktreeArgs<T> {
  name: string;
  dir: string;
  fn: (worktreePath: string) => Promise<T>;
}

export const withWorktree = async <T>({ name, dir, fn }: WithWorktreeArgs<T>): Promise<T> => {
  const worktree = await createWorktree({ name, dir });
  const symlinkType = process.platform === "win32" ? "junction" : "dir";
  symlinkSync(`${dir}/node_modules`, `${worktree.path}/node_modules`, symlinkType);
  try {
    return await fn(worktree.path);
  } finally {
    await removeWorktree({ name, dir, force: true });
  }
};

interface HasCommitsArgs {
  branch: string;
  repoDir: string;
}

export const hasCommits = ({ branch, repoDir }: HasCommitsArgs): boolean => {
  try {
    const out = execSync(`git log "${branch}" ^HEAD --oneline`, { cwd: repoDir }).toString().trim();
    return out.length > 0;
  } catch (error) {
    logger.error(`Failed to inspect commits for branch "${branch}"`, { error });
    return false;
  }
};
