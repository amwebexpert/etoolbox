export interface Issue {
  id: string;
  title: string;
  whatToBuild: string;
  acceptanceCriteria: string[];
  blockedBy: string[];
  type: "AFK" | "HITL"; // AFK: Away From Keyboard; HITL: Human In The Loop
  passes: boolean;
  isPlanned: boolean;
}

export interface OrchestratorOptions {
  planFile: string;
  repoDir: string;
  maxIterations?: number;
}

export interface IssueWorktreeResult {
  issue: Issue;
  hasProducedCommits: boolean;
}
