A string can be "empty" in three ways — `null`/`undefined`, `""`, or whitespace-only `"  "` — and each manual check covers a different subset: `=== ""` misses `undefined` and `"  "`, `!value` misses `"  "`, `value || fallback` keeps `"  "`. The reader can't tell which subset was intended, and a whitespace-only input slips through as "filled in".

**What triggers**:

- Always: `x === ""` / `"" !== x` (unless typed as non-string), `x.trim() === ""`, `x.trim().length === 0`, `!x.trim()`.
- With type info, when `x` is a string (optionally `| null | undefined`): `!x`, `!!x`, `x.length === 0` / `!== 0`, `x || fallback`.
- `??` is not reported (keeps `""` on purpose). Equality → `isBlank`, inequality / `!!` → `isNotBlank`. No autofix.

**Fix**:

1. Import `isBlank` / `isNotBlank` from `@lichens-innovation/ts-common`.
2. Replace empty/falsy checks with `isBlank(x)`, and non-empty/truthy checks with `isNotBlank(x)`.
3. For `x || fallback`, write `isBlank(x) ? fallback : x`. If `""` must genuinely be kept and only nullish replaced, use `x ?? fallback` instead.

**AVOID**: dodging with `x?.length > 0`, `Boolean(x)`, or casting `x` to `unknown`/`any` so the type check misses it — the ambiguous empty-string intent stays.

{% include "includes/line_level_issues.md" %}
