A string has three "empty" states — `null`/`undefined`, `""`, and whitespace-only (`"  "`). `=== ""`, `.trim().length === 0`, `!value` and `value || fallback` each cover a different subset, so a reader can't tell whether `"  "` was meant to pass or was simply forgotten.

**Fix**: use `isBlank(value)` / `isNotBlank(value)` from `@lichens-innovation/ts-common`, which treat all three states as blank:
- `if (!value)` / `if (value === "")` → `if (isBlank(value))`
- `newVersion || currentVersion` → `isBlank(newVersion) ? currentVersion : newVersion`

`??` is fine and not reported: it deliberately keeps `""`.

**AVOID**: re-implementing the helper locally (`const isEmpty = (s) => !s?.trim()`) — import the shared one.

{% include "includes/line_level_issues.md" %}
