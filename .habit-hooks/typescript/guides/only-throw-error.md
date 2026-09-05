`throw`ing a string, a plain object, or `null` loses everything a catch site relies on: no stack trace, no `.message`, no `instanceof Error` narrowing. Whoever catches it has to special-case a value shape instead of a type.

**Throw a real `Error` (or a typed subclass):**
1. Plain failure: `throw new Error("message")`.
2. A failure callers need to branch on: a dedicated `class FooError extends Error { ... }` they can `instanceof`-check.
3. Re-throwing something caught as `unknown`: check `error instanceof Error` first, don't assume the shape.

**Known, deliberate exception**: some frameworks throw non-`Error` control-flow values on purpose — e.g. TanStack Router's `redirect()` returns a `Response`, and `throw redirect(...)` is the documented way to trigger a navigation from `beforeLoad`. That's not a bug being flagged, it's the rule not knowing the framework's convention. Disable it narrowly at that exact line with a comment explaining why, the way `src/navigation/router.tsx` does — don't disable it file-wide or silence it by wrapping the throw in something meaningless.

**AVOID**: `throw new Error(String(err))` as a blanket reflex when `err` might already be an `Error` — that discards the original stack trace. Check first, only wrap when it's genuinely not an `Error`.

{% include "includes/line_level_issues.md" %}
