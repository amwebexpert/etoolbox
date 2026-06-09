# TASK

Merge the following branches into the current branch:

{{BRANCHES}}

# INSTRUCTIONS

For each branch in the list above:

1. Run `git merge <branch> --no-edit`
2. If there are merge conflicts, resolve them intelligently by reading both sides and choosing the correct resolution
3. Run `bun run typecheck` and `bun run test` to verify everything passes
4. If tests fail, fix the issues before proceeding to the next branch
5. If a conflict cannot be resolved or tests cannot be fixed, skip this branch and add its issue id to `failed`

After all branches are processed, make a single summary commit.

# ISSUES

The branches correspond to these issues (use the snake_case id, not the branch name, in your output):

{{ISSUES}}

# OUTPUT

Return a JSON object with:
- `merged`: array of issue ids that were successfully merged
- `failed`: array of issue ids that could not be merged

Example:
```json
{ "merged": ["add_user_auth", "fix_date_format"], "failed": ["refactor_api_client"] }
```
