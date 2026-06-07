import { logger } from "@lichens-innovation/ts-common/logger";
import { readFileSync, writeFileSync } from "node:fs";

import type { Issue } from "./orchestrator.types.ts";

export class Plan {
  private readonly filePath: string;
  private issues: Issue[] = [];

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  load(): void {
    try {
      const raw = readFileSync(this.filePath, "utf-8");
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        throw new Error("plan.json root must be a JSON array");
      }
      this.issues = parsed as Issue[];
    } catch (error) {
      logger.error(`Failed to load plan file at ${this.filePath}`, { error });
      throw error;
    }
  }

  save(): void {
    writeFileSync(this.filePath, JSON.stringify(this.issues, null, 2));
  }

  getAll(): Issue[] {
    return this.issues;
  }

  getUnplanned(): Issue[] {
    return this.issues.filter((i) => !i.isPlanned);
  }

  getIssueById(id: string): Issue | undefined {
    return this.issues.find((issue) => issue.id === id);
  }

  isIssuePassed(id: string): boolean {
    return this.getIssueById(id)?.passes ?? false;
  }

  getUnblocked(): Issue[] {
    return this.issues.filter((issue: Issue) => {
      const { isPlanned, passes, type, blockedBy } = issue;
      return isPlanned && !passes && type === "AFK" && blockedBy.every((id) => this.isIssuePassed(id));
    });
  }

  get remainingAfkIssues(): Issue[] {
    return this.issues.filter((issue) => !issue.passes && issue.type === "AFK");
  }

  markPlanned(id: string, blockedBy: string[]): void {
    const issue = this.issues.find((i) => i.id === id);
    if (issue) {
      issue.blockedBy = blockedBy;
      issue.isPlanned = true;
    }
  }

  markPassed(id: string): void {
    const issue = this.issues.find((i) => i.id === id);
    if (issue) issue.passes = true;
  }
}
