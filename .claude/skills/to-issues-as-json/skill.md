---
name: to-issues-as-json
description: Break a plan, spec, or PRD into independently-grabbable issues and serialize them to plans/prd.json using tracer-bullet vertical slices. Use when user wants to convert a plan into a JSON file, create a local prd.json, or break down work into JSON issues.
---

# To Issues as JSON

Break a plan into independently-grabbable issues using vertical slices (tracer bullets) and write them to `plans/prd.json`.

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes an issue reference (issue number, URL, or path) as an argument, fetch it from the issue tracker and read its full body and comments.

### 2. Explore the codebase (optional)

If you have not already explored the codebase, do so to understand the current state of the code. Issue titles and descriptions should use the project's domain glossary vocabulary, and respect ADRs in the area you're touching.

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

Ask the user:

- Does the granularity feel right? (too coarse / too fine)
- Are the dependency relationships correct?
- Should any slices be merged or split further?
- Are the correct slices marked as HITL and AFK?

Iterate until the user approves the breakdown.

### 5. Write plans/prd.json

Once approved, write the full array to `plans/prd.json`, overwriting any existing content. Use the schema below. Publish slices in dependency order (blockers first).

<json-schema>
[
  {
    "id": "short_snake_case_slug",
    "title": "Short descriptive title",
    "what_to_build": "Concise description of this vertical slice. Describe end-to-end behavior, not layer-by-layer implementation.",
    "acceptance_criteria": [
      "Criterion 1",
      "Criterion 2"
    ],
    "blocked_by": ["other_slice_id"],
    "type": "AFK",
    "passes": false
  }
]
</json-schema>

- `blocked_by` is an empty array when there are no blockers.
- `passes` is always `false` on initial write.
