import { logger } from "@lichens-innovation/ts-common/logger";
import { execFile, execSync } from "node:child_process";
import { mkdirSync, symlinkSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const WORKTREES_DIR = ".orchestrator-worktrees";

const branchToWorktreeDirName = (branch: string): string => branch.replaceAll("/", "--");

interface GetWorktreePathArgs {
  repoDir: string;
  branch: string;
}

const getWorktreePath = ({ repoDir, branch }: GetWorktreePathArgs): string =>
  path.join(repoDir, WORKTREES_DIR, branchToWorktreeDirName(branch));

interface RunGitArgs {
  args: string[];
  cwd: string;
}

const runGit = async ({ args, cwd }: RunGitArgs): Promise<void> => {
  await execFileAsync("git", args, { cwd });
};

interface BranchExistsArgs {
  branch: string;
  repoDir: string;
}

const branchExists = async ({ branch, repoDir }: BranchExistsArgs): Promise<boolean> => {
  try {
    await runGit({ args: ["rev-parse", "--verify", branch], cwd: repoDir });
    return true;
  } catch (error) {
    logger.debug(`Branch "${branch}" does not exist`, { error });
    return false;
  }
};

interface CreateWorktreeArgs {
  name: string;
  dir: string;
}

interface WorktreeResult {
  path: string;
}

const createWorktree = async ({ name, dir }: CreateWorktreeArgs): Promise<WorktreeResult> => {
  const worktreePath = getWorktreePath({ repoDir: dir, branch: name });
  mkdirSync(path.dirname(worktreePath), { recursive: true });

  try {
    await runGit({ args: ["worktree", "remove", "--force", worktreePath], cwd: dir });
  } catch (error) {
    logger.debug(`No stale worktree at "${worktreePath}"`, { error });
  }

  if (await branchExists({ branch: name, repoDir: dir })) {
    await runGit({ args: ["worktree", "add", worktreePath, name], cwd: dir });
  } else {
    await runGit({ args: ["worktree", "add", "-b", name, worktreePath, "HEAD"], cwd: dir });
  }

  return { path: worktreePath };
};

interface RemoveWorktreeArgs {
  name: string;
  dir: string;
  force?: boolean;
  /** Missing worktrees are expected during branch cleanup; log at debug instead of error. */
  quietIfMissing?: boolean;
}

const removeWorktree = async ({ name, dir, force, quietIfMissing }: RemoveWorktreeArgs): Promise<void> => {
  const worktreePath = getWorktreePath({ repoDir: dir, branch: name });
  const forceFlag = force ? ["--force"] : [];
  const args = ["worktree", "remove", ...forceFlag, worktreePath];
  try {
    await runGit({ args, cwd: dir });
  } catch (error) {
    const message = `Failed to remove worktree at "${worktreePath}"`;
    if (quietIfMissing) {
      logger.debug(message, { error });
    } else {
      logger.error(message, { error });
    }
  }
};

export interface WithWorktreeArgs<T> {
  name: string;
  dir: string;
  fn: (worktreePath: string) => Promise<T>;
}

export const withWorktree = async <T>({ name, dir, fn }: WithWorktreeArgs<T>): Promise<T> => {
  const worktree = await createWorktree({ name, dir });
  const symlinkType = process.platform === "win32" ? "junction" : "dir";
  symlinkSync(path.join(dir, "node_modules"), path.join(worktree.path, "node_modules"), symlinkType);
  try {
    return await fn(worktree.path);
  } finally {
    await removeWorktree({ name, dir, force: true });
  }
};

export interface HasCommitsArgs {
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

export type DeleteBranchResult = "deleted" | "not-found" | "failed";

export interface DeleteBranchArgs {
  branch: string;
  repoDir: string;
}

export const deleteBranch = async ({ branch, repoDir }: DeleteBranchArgs): Promise<DeleteBranchResult> => {
  await removeWorktree({ name: branch, dir: repoDir, force: true, quietIfMissing: true });
  const exists = await branchExists({ branch, repoDir });

  if (!exists) {
    logger.debug(`Branch "${branch}" already absent`);
    return "not-found";
  }

  try {
    await runGit({ args: ["branch", "-d", branch], cwd: repoDir });
    logger.info(`Deleted branch "${branch}"`);
    return "deleted";
  } catch (error) {
    logger.warn(`Could not delete branch "${branch}"`, { error });
    return "failed";
  }
};
