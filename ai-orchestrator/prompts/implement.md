# TASK

Implement the following task on branch `{{BRANCH}}`.

**ID**: {{TASK_ID}}
**Title**: {{TASK_TITLE}}

## What to build

{{WHAT_TO_BUILD}}

## Acceptance criteria

{{ACCEPTANCE_CRITERIA}}

# WORKTREE

You are in an isolated git worktree at: `{{WORKTREE_PATH}}`
Branch: `{{BRANCH}}`

CRITICAL:

- Use ONLY relative paths for Read/Write/Edit (e.g. `src/routes/router.tsx`)
- NEVER use absolute paths outside this worktree
- Run all git commands here; do not `cd` to the parent repo

# CONTEXT

<recent-commits>
!`git log -n 10 --format="%H%n%ad%n%B---" --date=short`
</recent-commits>

# REFERENCE PATTERNS

Read these first — do not explore further unless blocked:

- Screen: `src/screens/diff-viewer/`
- Router: `src/routes/router.tsx`
- Side menu: `src/components/layout/app-side-menu.utils.tsx`
- E2E: `e2e/tests/diff-viewer/`, `e2e/pages/diff-viewer-page.ts`, `e2e/fixtures/pages.fixture.ts`, `e2e/helpers/storage.ts`

Do not deep-read `node_modules` library sources unless the package README/types are insufficient.

# EXECUTION

Cover each acceptance criterion with tests; batch related tests and implementation rather than one test at a time.

1. Write the tests that cover the acceptance criteria (group related cases)
2. Implement the minimal code to make them pass
3. Refactor for clarity and consistency once green

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
