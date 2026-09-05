`useMemo` isn't free — it allocates a dependency-comparison closure and a cache slot on every render, so it only pays for itself when the memoized computation is more expensive than that overhead. Wrapping a plain string template, a member access, or a simple boolean expression in `useMemo` spends more than it saves, while making the code read as if something expensive is happening here.

**Fix**: assign the value directly — `const label = \`${a} (${b})\`;` — and let it recompute on every render like any other local variable. Reach for `useMemo` when the computation actually does real work (iterates a large array, does a non-trivial calculation, calls a function) and that cost has been observed to matter.

**AVOID**: removing `useMemo` from a call site where the *reference identity* of the result matters (e.g. an object/array passed to a memoized child's props, or into another hook's dependency array) — there, stability, not compute cost, is the reason it's there; check what depends on the reference before removing the memo.

{% include "includes/line_level_issues.md" %}
