# TASK

Implement the following task on branch `{{BRANCH}}`.

**ID**: {{TASK_ID}}
**Title**: {{TASK_TITLE}}

## What to build

{{WHAT_TO_BUILD}}

## Acceptance criteria

{{ACCEPTANCE_CRITERIA}}

# CONTEXT

<recent-commits>
!`git log -n 10 --format="%H%n%ad%n%B---" --date=short`
</recent-commits>

# EXPLORATION

Explore the repo and read all relevant source files and test files before writing any code. Understand the existing patterns and conventions.

# EXECUTION

Use red-green-refactor:

1. RED: write one failing test covering an acceptance criterion
2. GREEN: write the minimal implementation to make it pass
3. REPEAT until all acceptance criteria are covered
4. REFACTOR for clarity and consistency

# FEEDBACK LOOPS

Before committing, run `bun run typecheck` and `bun run test` to confirm everything passes.

# COMMIT

Make a git commit using conventional format: `<type>(orchestrator): [{{TASK_ID}}] description`

Pick `<type>` based on what was built:
- `feat` — new feature or behaviour
- `fix` — bug fix
- `refactor` — restructuring without behaviour change
- `test` — test-only changes

Describe key decisions made and list files changed. Keep it concise.

# RULES

- Only work on this single task
- Do not implement anything beyond the acceptance criteria
- Do not close or modify any external issues
