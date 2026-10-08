`error instanceof Error ? error.message : String(error)` is re-implemented by hand in every `catch`, and every copy handles a different subset of cases: a thrown string, an object with a `message`, `undefined`. The fallback branches drift (`"Unknown error"` here, `JSON.stringify` there), so the same failure is reported differently depending on which file caught it.

**What triggers**: a ternary `x instanceof Error ? x.message : …`, or its negated form `!(x instanceof Error) ? … : x.message`, where the `.message` is read from the same subject that was tested. Other classes (`instanceof TypeError`) or other properties (`.name`) are not reported. No autofix.

**Fix**:

1. Import `getErrorMessage` from `@lichens-innovation/ts-common`.
2. Replace the whole ternary with `getErrorMessage(x)` — it handles `Error` instances, objects with a `message`, strings, empty and unknown values.
3. If you had a custom fallback text, check whether `getErrorMessage`'s output already covers it; keep any extra context in the surrounding log/notify call, not in a re-implemented ternary.

**AVOID**: rewriting the same logic as an `if (x instanceof Error)` block or a local `toMessage` helper — it dodges the pattern match while keeping the duplicated, drifting implementation.

{% include "includes/line_level_issues.md" %}
