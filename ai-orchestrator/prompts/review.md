# TASK

Review the code changes on branch `{{BRANCH}}` relative to `{{SOURCE_BRANCH}}` along **two separate axes** — **Standards** and **Spec** — then improve clarity, consistency, and maintainability while preserving exact functionality.

A change can pass one axis and fail the other. Report them separately; do not merge or rerank findings across axes.

# CONTEXT

## Branch diff

!`git diff {{SOURCE_BRANCH}}...{{BRANCH}}`

## Commits on this branch

!`git log {{SOURCE_BRANCH}}..{{BRANCH}} --oneline`

## Orchestrator plan (spec source)

Read `{{PLAN_FILE}}`. Match commits to issues via conventional commit tags `[issue_id]` (e.g. `[compression_utils_and_store]`).

# REVIEW PROCESS

Follow these steps **in order**. Steps 1–4 are the review; steps 5–6 are optional refactors driven by findings.

## 1. Pin the fixed point

Confirm `{{SOURCE_BRANCH}}` resolves and the diff above is non-empty. If the ref is invalid or the diff is empty, stop and report why — do not proceed.

Diff command (three-dot, merge-base comparison): `git diff {{SOURCE_BRANCH}}...{{BRANCH}}`

## 2. Identify the spec source

Use this order:

1. **Orchestrator plan** — `{{PLAN_FILE}}`: for each issue referenced in commit messages, use `whatToBuild` and `acceptanceCriteria` as the spec.
2. **Issue references in commits** — `#123`, `Closes #45`, etc.; fetch details if an issue tracker is available.
3. **Spec files** under `docs/`, `specs/`, or `.scratch/` matching the branch or feature name.

If no spec is found for part of the diff, note "no spec available" for that scope in the Spec report — do not invent requirements.

## 3. Identify standards sources

Apply, in priority order:

1. **Project rules** (repo overrides everything below):
   - @.claude/rules/react-typescript.md
   - @.claude/rules/react-naming.md
   - @.claude/rules/react-security.md
   - @.claude/rules/react-components.md
   - @.claude/rules/react-tests.md
2. **CONTRIBUTING.md**
3. **Smell baseline** (Fowler, _Refactoring_ ch.3) — judgement calls only; skip anything ESLint or other tooling already enforces; a documented repo standard suppresses a matching smell:

   | Smell                  | What to look for                                            | Fix                                           |
   | ---------------------- | ----------------------------------------------------------- | --------------------------------------------- |
   | Mysterious Name        | Name doesn't reveal purpose                                 | Rename; murky design if no honest name exists |
   | Duplicated Code        | Same logic shape in multiple hunks/files                    | Extract shared shape, call from both          |
   | Feature Envy           | Method reaches into another object's data more than its own | Move method onto the envied object            |
   | Data Clumps            | Same fields/params travel together                          | Bundle into one type                          |
   | Primitive Obsession    | Primitive/string stands in for a domain concept             | Give the concept its own small type           |
   | Repeated Switches      | Same switch/if-cascade on the same type recurs              | Polymorphism or one shared map                |
   | Shotgun Surgery        | One logical change scattered across many files              | Gather related changes into one module        |
   | Divergent Change       | One module edited for several unrelated reasons             | Split so each module changes for one reason   |
   | Speculative Generality | Abstraction/hooks added for needs the spec doesn't have     | Delete; inline until a real need shows        |
   | Message Chains         | Long `a.b().c().d()` navigation                             | Hide walk behind one method                   |
   | Middle Man             | Class/function mostly delegates                             | Cut it; call the real target                  |
   | Refused Bequest        | Subclass ignores most of what it inherits                   | Drop inheritance; use composition             |

## 4. Two-axis review (priority)

Evaluate **Standards** and **Spec** independently — mentally separate the two passes so one axis does not mask the other.

### Standards axis

Per file/hunk where relevant, report:

- **(a)** Every place the diff violates a documented standard — cite the standard (file + rule).
- **(b)** Any smell-baseline heuristic you spot — name the smell and quote the hunk.

Distinguish hard violations (documented-standard breaches) from judgement calls (baseline smells only). Skip anything tooling enforces.

### Spec axis

Using the spec from step 2, report:

- **(a)** Requirements missing or only partially implemented — quote the spec line.
- **(b)** Behaviour in the diff not asked for (scope creep).
- **(c)** Requirements that look implemented but the implementation looks wrong — quote the spec line.

If no spec is available, report that under Spec and skip (a)–(c) for that scope.

## 5. Apply improvements

Address Standards findings and safe clarity refactors. For Spec gaps that are clear bugs or missing acceptance criteria, fix them. Do **not** expand scope beyond what the spec requires.

Run **react-single-responsibility**: execute that skill's simplification strategies on all files in the diff. Let the skill define decomposition order, structure, and rules.

## 6. Preserve functionality

Never change what the code does — only how it does it. All original features, outputs, and behaviours must remain intact. Exception: fixes for confirmed Spec-axis gaps (step 4) that restore intended behaviour.

# OUTPUT

Before making changes, write a brief review report with separate sections:

## Standards

(Findings from step 4 — Standards axis)

## Spec

(Findings from step 4 — Spec axis)

End the report with a one-line summary per axis: total findings and the worst issue within each axis (if any). Do not pick a single winner across axes.

# EXECUTION

If improvements are needed:

1. Make the changes directly on this branch
2. Run `bun run typecheck`, `bun run lint:package`, `bun run lint:ci`, `bun run lint:unused` and `bun run test` to ensure nothing is broken
3. Commit using conventional format: `refactor(orchestrator): [review] description`

If the code is already clean, spec-complete, and well-structured, write the report only — make no commit.
