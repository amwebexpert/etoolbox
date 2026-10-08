`JSON.parse` throws a `SyntaxError` on anything that isn't valid JSON. If the input ever comes from outside the current process's own guaranteed-well-formed output — an API response, `localStorage`, a query param, a file on disk someone could have hand-edited — an unguarded `JSON.parse` turns a bad payload into an uncaught exception that crashes the surrounding flow instead of failing gracefully.

**What triggers**: any `JSON.parse(...)` that isn't inside a `try { }` block _of the same function_ — a `try` wrapping an outer function doesn't guard an arrow/callback declared inside it, and calls inside `catch`/`finally` are flagged. No autofix.

**Fix**:

1. Prefer `safeJsonParse<T>(value, fallback?)` from `@lichens-innovation/ts-common`. It never throws and returns `fallback` (or `undefined`) on bad input: `const settings = safeJsonParse<Settings>(raw, DEFAULT_SETTINGS);`.
2. Need custom failure handling (log, rethrow, user-facing error)? Wrap the call in a `try/catch` in the same function and handle it explicitly, e.g. with `getErrorMessage(error)` from ts-common.
3. Don't put that `try` inside another `try`/`catch` (`no-nested-try`) — extract a named helper instead.

**AVOID**: `try { ... } catch {}` with an empty catch — that trades a crash for silent data loss, which is often worse because nothing signals that the parse ever failed.

{% include "includes/line_level_issues.md" %}
