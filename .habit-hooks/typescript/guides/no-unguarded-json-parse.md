`JSON.parse` throws a `SyntaxError` on anything that isn't valid JSON. If the input ever comes from outside the current process's own guaranteed-well-formed output — an API response, `localStorage`, a query param, a file on disk someone could have hand-edited — an unguarded `JSON.parse` turns a bad payload into an uncaught exception that crashes the surrounding flow instead of failing gracefully.

**Fix**: wrap it in a `try/catch`, and decide what "failed to parse" means for this call site — return a fallback value, log and rethrow, or surface a user-facing error. Don't just swallow it silently.

**AVOID**: `try { ... } catch {}` with an empty catch — that trades a crash for silent data loss, which is often worse because nothing signals that the parse ever failed.

{% include "includes/line_level_issues.md" %}
