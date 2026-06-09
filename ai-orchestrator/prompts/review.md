# TASK

Review the code changes on branch `{{BRANCH}}` relative to `{{SOURCE_BRANCH}}`. Improve clarity, consistency, and maintainability while preserving exact functionality.

# CONTEXT

## Branch diff

!`git diff {{SOURCE_BRANCH}}...{{BRANCH}}`

## Commits on this branch

!`git log {{SOURCE_BRANCH}}..{{BRANCH}} --oneline`

# REVIEW PROCESS

1. **Understand the change**: Read the diff and commits to understand the intent.

2. **Apply project standards** from:
   - @.claude/rules/react-typescript.md
   - @.claude/rules/react-naming.md
   - @.claude/rules/react-security.md
   - @.claude/rules/react-components.md
   - @.claude/rules/react-tests.md

3. **Check correctness**:
   - Does the implementation match the intent?
   - Are edge cases handled?
   - Are new behaviours covered by tests?

4. **Run react-single-responsibility**: Execute the **react-single-responsibility** skill's simplification strategies on all files in scope (only apply the skill to the files identified in step 1). Let that skill define decomposition order, structure, and rules.

5. **Preserve functionality**: Never change what the code does — only how it does it. All original features, outputs, and behaviors must remain intact.

# EXECUTION

If improvements are needed:

1. Make the changes directly on this branch
2. Run `bun run typecheck` and `bun run test` to ensure nothing is broken
3. Commit using conventional format: `refactor(orchestrator): [review] description`

If the code is already clean and well-structured, do nothing and make no commit.
