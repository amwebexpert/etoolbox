`useMemo` isn't free — it allocates a dependency-comparison closure and a cache slot on every render, so it only pays for itself when the memoized computation is more expensive than that overhead. Wrapping a plain string template, a member access, or a simple boolean expression in `useMemo` spends more than it saves, while making the code read as if something expensive is happening here.

**What triggers**: `useMemo(arrow, deps)` where the returned expression — the concise body, or the first `return` statement at the top of a block body — contains no function call or `new` anywhere inside it. Object/array literals count as trivial too: `useMemo(() => ({ a, b }), [a, b])` is flagged. Any call (`items.filter(...)`, `format(x)`) makes it non-trivial. No autofix.

**Fix**:

1. Default: drop `useMemo` and assign directly — `const label = \`${a} (${b})\`;` — letting it recompute every render like any other local.
2. If the result is an object/array whose _reference identity_ genuinely matters (passed to a `memo`-ized child's props, or used as another hook's dependency), keep the `useMemo` and add `// eslint-disable-next-line coding-guide/no-trivial-usememo -- stable reference for <consumer>` naming what depends on it.

**AVOID**:

- Keeping the memo silently "for identity" without checking a memoized consumer actually exists — if nothing compares the reference, drop it.
- Sneaking a pointless call into the body (`String(a)`, `Object.assign({}, ...)`) or burying the real value behind an earlier `return` to make the rule see a call.

{% include "includes/line_level_issues.md" %}
