---
name: to-issues-as-json
version: 0.1.0
description: >
  This skill should be used when the user asks to "convert a plan to JSON",
  "create a prd.json", "serialize issues to JSON", "break down work into JSON issues",
  "write issues to ai-orchestrator/plan.json", or "break a plan into a JSON file".
allowed-tools: Read, Write, WebFetch, AskUserQuestion, Agent
---

# To Issues as JSON

Break a plan into independently-grabbable issues using vertical slices (tracer bullets) and write them to `ai-orchestrator/plan.json`.

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes an issue reference (issue number, URL, or path) as an argument, fetch it from the issue tracker and read its full body and comments.

### 2. Explore the codebase (optional)

Explore the codebase to understand the current state of the code. Issue titles and descriptions should use the project's domain glossary vocabulary and respect ADRs in the area being touched.

### 3. Draft vertical slices

Break the plan into **tracer bullet** issues. Each issue is a thin vertical slice that cuts through ALL integration layers end-to-end, NOT a horizontal slice of one layer.

Slices may be 'HITL' or 'AFK'. HITL slices require human interaction, such as an architectural decision or a design review. AFK slices can be implemented and merged without human interaction. Prefer AFK over HITL where possible.

<vertical-slice-rules>
- Each slice delivers a narrow but COMPLETE path through every layer (schema, API, UI, tests)
- A completed slice is demoable or verifiable on its own
- Prefer many thin slices over few thick ones
</vertical-slice-rules>

### 4. Quiz the user

Present the proposed breakdown as a numbered list. For each slice, show:

- **ID**: short snake_case slug (e.g. `add_user_capabilities`)
- **Title**: short descriptive name
- **Type**: HITL / AFK
- **Blocked by**: which other slice IDs (if any) must complete first

Request user feedback on:

- Granularity (too coarse / too fine)
- Dependency relationships
- Slices to merge or split further
- Correct HITL / AFK classification

Iterate until the breakdown is approved.

### 5. Write plans/prd.json

Once approved, write the full array to `ai-orchestrator/plan.json`, overwriting any existing content. Use the schema below. Publish slices in dependency order (blockers first).

<json-schema>
[
  {
    "id": "short_snake_case_slug",
    "title": "Short descriptive title",
    "whatToBuild": "Concise description of this vertical slice. Describe end-to-end behavior, not layer-by-layer implementation.",
    "acceptance_criteria": [
      "Criterion 1",
      "Criterion 2"
    ],
    "blockedBy": [],
    "type": "AFK",
    "passes": false,
    "isPlanned": false
  }
]
</json-schema>

- `blockedBy` is always an empty array on initial write — the orchestrator's planner agent will populate it.
- `passes` is always `false` on initial write.
- `isPlanned` is always `false` on initial write — the planner agent sets it to `true` after analyzing dependencies.
