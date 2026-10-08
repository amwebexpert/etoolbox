A `try` inside another `try`'s block or `catch` handler means two separate error-recovery paths are interleaved in one place — a reader has to work out which failure a given `catch` actually handles, and which errors from the inner block can still escape to the outer one.

**What triggers**: a `try` statement inside another `try` block or `catch` clause of the same function (`finally` isn't checked). The check stops at function boundaries, so a `try` inside a called helper or callback isn't nested. No autofix.

**Fix**:

1. Catch-then-fallback (try A, and in the catch, try B): extract the inner `try/catch` into a named helper function that returns its result or a fallback, then call it from the outer `catch`. This is usually the cleanest shape.
2. Two independent steps that each need their own handling: place the `try` statements sequentially, not nested.
3. Same handling for both: merge into one `try` whose single `catch` branches on the error (`instanceof`, a `code` field); use `getErrorMessage(error)` from `@lichens-innovation/ts-common` for messages.

**AVOID**: flattening into one bare `catch` that swallows both failure modes identically when they need different handling, and dodging with an inline IIFE (`(() => { try {…} catch {…} })()`) instead of a named helper.

{% include "includes/line_level_issues.md" %}
