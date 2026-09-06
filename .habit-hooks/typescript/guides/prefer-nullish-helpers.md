`value !== null && value !== undefined` says "isn't nullish" in the longest possible way, and it's easy to get subtly wrong (typo one side into `===`, or compare against the wrong variable on the second clause) without it looking obviously broken.

**Fix**: use the project's own `isNullish`/`isNotBlank`-style helpers from `@lichens-innovation/ts-common` — `!isNullish(value)` instead of the `&&` pair, `isNullish(value)` instead of the `||` pair. One call, one obviously-correct meaning, and the same helper is already used elsewhere in the codebase so a reader recognizes it instantly.

**AVOID**: applying this pattern to a check that isn't actually a nullish check — `value === "" || value === undefined` (a blank-or-missing check) is a different concept (`isBlank`), not the same helper.

{% include "includes/line_level_issues.md" %}
