import { isNotBlank } from "@lichens-innovation/ts-common";
import { logger } from "@lichens-innovation/ts-common/logger";
import { z } from "zod";

import { loadPrompt, runAgent, runTypedAgent } from "./utils/agent.utils.ts";
import { setAgentLogDir } from "./utils/agent-logger.utils.ts";
import type { Issue, IssueWorktreeResult, OrchestratorOptions } from "./utils/orchestrator.types.ts";
import { Plan } from "./utils/plan.ts";
import { deleteBranch, hasCommits, withWorktree } from "./utils/worktree.utils.ts";

const plannerOutputSchema = z.object({
  issues: z.array(z.object({ id: z.string(), blockedBy: z.array(z.string()) })),
});

const mergerOutputSchema = z.object({
  merged: z.array(z.string()),
  failed: z.array(z.string()),
});

interface IssueWorktreeParams {
  issue: Issue;
  branch: string;
  worktreePath: string;
}

interface DeleteImplementationBranchesResult {
  deleted: string[];
  notFound: string[];
  failed: string[];
}

export class Orchestrator {
  private readonly repoDir: string;
  private readonly maxIterations: number;
  private readonly plan: Plan;

  constructor({ planFile, repoDir, logDir, maxIterations = 20 }: OrchestratorOptions) {
    setAgentLogDir(logDir);
    this.repoDir = repoDir;
    this.maxIterations = maxIterations;
    this.plan = new Plan(planFile);
  }

  async run(): Promise<void> {
    for (let iteration = 1; iteration <= this.maxIterations; iteration++) {
      logger.info(`\n=== Iteration ${iteration}/${this.maxIterations} ===\n`);

      this.plan.load();
      await this.runPlanningPhase();
      const unblockedIssues = this.plan.getUnblocked();

      if (unblockedIssues.length === 0) {
        this.logNoUnblockedIssuesStatus();
        break;
      }

      this.logUnblockedIssues(unblockedIssues);
      const completedIssues = await this.runImplementationPhase(unblockedIssues);

      if (completedIssues.length === 0) {
        logger.info("No commits produced this iteration.");
        continue;
      }

      await this.runMergePhase(completedIssues);
    }

    if (this.plan.remainingAfkIssues.length === 0) {
      await this.cleanupImplementationBranches();
    }

    logger.info("\nAll done.");
  }

  private logUnblockedIssues(unblockedIssues: Issue[]): void {
    logger.info(`${unblockedIssues.length} unblocked issue(s):`);
    for (const issue of unblockedIssues) {
      logger.info(`  ${issue.id}: ${issue.title}`);
    }
  }

  private logNoUnblockedIssuesStatus(): void {
    if (this.plan.remainingAfkIssues.length > 0) {
      logger.info("No unblocked issues — possible circular dependency or all remaining are HITL.");
    } else {
      logger.info("All AFK issues complete.");
    }
  }

  private getBranchName(issueId: string): string {
    return `orchestrator/implementation-task-${issueId}`;
  }

  private async runPlanningPhase(): Promise<void> {
    const unplanned = this.plan.getUnplanned();
    if (unplanned.length === 0) return;

    logger.info(`Planning ${unplanned.length} unplanned issue(s)...`);

    const { issues: planned } = await runTypedAgent({
      prompt: loadPrompt({
        name: "plan.md",
        substitutions: { PLAN_JSON: JSON.stringify(this.plan.getAll(), null, 2) },
      }),
      schema: plannerOutputSchema,
      label: "planner",
      options: {
        cwd: this.repoDir,
        model: "claude-opus-4-7",
        maxTurns: 20,
        permissionMode: "bypassPermissions",
      },
    });

    for (const { id, blockedBy } of planned) {
      this.plan.markPlanned(id, blockedBy);
    }
    this.plan.save();
    logger.info("Planning complete.");
  }

  private async implementAndReviewIssue(issue: Issue): Promise<IssueWorktreeResult> {
    const branch = this.getBranchName(issue.id);

    return withWorktree({
      name: branch,
      dir: this.repoDir,
      fn: async (worktreePath) => {
        await this.runImplementAgent({ issue, branch, worktreePath });

        if (!hasCommits({ branch, repoDir: this.repoDir })) {
          logger.info(`  ${issue.id}: no commits produced, skipping review`);
          return { issue, hasProducedCommits: false };
        }

        await this.runReviewAgent({ issue, branch, worktreePath });

        return { issue, hasProducedCommits: true };
      },
    });
  }

  private async runImplementAgent({ issue, branch, worktreePath }: IssueWorktreeParams): Promise<void> {
    await runAgent({
      prompt: loadPrompt({
        name: "implement.md",
        substitutions: {
          TASK_ID: issue.id,
          TASK_TITLE: issue.title,
          WHAT_TO_BUILD: issue.whatToBuild,
          ACCEPTANCE_CRITERIA: issue.acceptanceCriteria.map((c) => `- ${c}`).join("\n"),
          BRANCH: branch,
        },
      }),
      label: `impl:${issue.id}`,
      options: {
        cwd: worktreePath,
        model: "claude-opus-4-7",
        maxTurns: 100,
        permissionMode: "bypassPermissions",
      },
    });
  }

  private async runReviewAgent({ issue, branch, worktreePath }: IssueWorktreeParams): Promise<void> {
    logger.info(`  ${issue.id}: reviewing code changes`);

    await runAgent({
      prompt: loadPrompt({
        name: "review.md",
        substitutions: { BRANCH: branch, SOURCE_BRANCH: "HEAD" },
      }),
      label: `review:${issue.id}`,
      options: {
        cwd: worktreePath,
        model: "claude-sonnet-4-6",
        maxTurns: 10,
        permissionMode: "bypassPermissions",
      },
    });
  }

  private async runImplementationPhase(unblockedIssues: Issue[]): Promise<Issue[]> {
    const settled = await Promise.allSettled(unblockedIssues.map((issue) => this.implementAndReviewIssue(issue)));

    for (const [index, outcome] of settled.entries()) {
      if (outcome.status === "rejected") {
        const issueId = unblockedIssues[index]?.id ?? `index-${index}`;
        logger.error(`  ✗ ${issueId} failed`, { err: outcome.reason });
      }
    }

    return settled
      .filter(
        (outcome): outcome is PromiseFulfilledResult<IssueWorktreeResult> =>
          outcome.status === "fulfilled" && outcome.value.hasProducedCommits
      )
      .map((outcome) => outcome.value.issue);
  }

  private async runMergePhase(completedIssues: Issue[]): Promise<void> {
    const completedBranches = completedIssues.map((issue) => this.getBranchName(issue.id));
    logger.info(`${completedBranches.length} branch(es) ready to merge.`);

    const { merged, failed } = await runTypedAgent({
      prompt: loadPrompt({
        name: "merge.md",
        substitutions: {
          BRANCHES: completedBranches.map((b) => `- ${b}`).join("\n"),
          ISSUES: completedIssues.map((i) => `- ${i.id}: ${i.title}`).join("\n"),
        },
      }),
      schema: mergerOutputSchema,
      label: "merger",
      options: {
        cwd: this.repoDir,
        model: "claude-sonnet-4-6",
        maxTurns: 20,
        permissionMode: "bypassPermissions",
      },
    });

    for (const id of merged) {
      this.plan.markPassed(id);
    }
    this.plan.save();

    logger.info(`\tMerged: ${merged.length === 0 ? "none" : merged.join(", ")}`);
    if (failed.length > 0) {
      logger.info(`\tFailed to merge: ${failed.join(", ")}`);
    }
  }

  private async deleteImplementationBranches(issues: Issue[]): Promise<DeleteImplementationBranchesResult> {
    const results = await Promise.all(
      issues.map(async (issue) => {
        const branch = this.getBranchName(issue.id);
        const outcome = await deleteBranch({ branch, repoDir: this.repoDir });
        return { branch, outcome };
      })
    );

    return {
      deleted: results.filter((r) => r.outcome === "deleted").map((r) => r.branch),
      notFound: results.filter((r) => r.outcome === "not-found").map((r) => r.branch),
      failed: results.filter((r) => r.outcome === "failed").map((r) => r.branch),
    };
  }

  private async cleanupImplementationBranches(): Promise<void> {
    const passedAfk = this.plan.getAll().filter((issue) => issue.passes && issue.type === "AFK");
    if (passedAfk.length === 0) {
      return;
    }

    const { deleted, notFound, failed } = await this.deleteImplementationBranches(passedAfk);

    const summaryParts = [
      deleted.length > 0 ? `${deleted.length} deleted` : null,
      notFound.length > 0 ? `${notFound.length} already absent` : null,
      failed.length > 0 ? `${failed.length} failed (${failed.join(", ")})` : null,
    ].filter(isNotBlank);

    const message = `Cleaned up implementation branches: ${summaryParts.join(", ")}`;
    if (failed.length > 0) {
      logger.warn(message);
    } else {
      logger.info(message);
    }
  }
}
