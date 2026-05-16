# TASK

Analyze the issues in the plan below and determine their dependency relationships.

<plan-json>
{{PLAN_JSON}}
</plan-json>

# INSTRUCTIONS

Focus only on issues where `isPlanned` is `false`. Do not modify issues where `isPlanned` is `true`.

For each unplanned issue, determine its `blockedBy` array by analyzing:

- Does it require code, types, or infrastructure that another issue introduces?
- Does it modify overlapping files or modules with another issue, making concurrent work likely to produce merge conflicts?
- Do its requirements depend on an API shape or decision that another issue will establish?

An issue's `blockedBy` array must contain only the `id` values of **other issues in this plan** that must complete (`passes: true`) before this one can begin.

An issue has an empty `blockedBy` array if it has no dependencies on other issues.

# CONTEXT

Explore the codebase to understand the current structure before making dependency decisions.

# OUTPUT

Return a JSON object with an `issues` array — one entry per unplanned issue:

```json
{
  "issues": [
    { "id": "issue_id", "blockedBy": ["other_id"] },
    { "id": "another_id", "blockedBy": [] }
  ]
}
```

Include **every** issue where `isPlanned` is `false`. Do not include issues where `isPlanned` is already `true`.
