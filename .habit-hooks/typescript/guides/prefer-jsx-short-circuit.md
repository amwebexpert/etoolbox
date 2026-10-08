`{count && <List />}` looks like "render `<List/>` when there are items", but when `count` is `0` React renders the literal `0` onto the page — a stray digit sitting where nothing should be.

House style is the `&&` short-circuit, **not** `cond ? <X/> : null`. Make the left side an actual boolean:

1. `{count > 0 && <List />}` — counts and `.length`: a comparison, not `!!`.
2. `{isReady && <List />}` — already-boolean conditions: short-circuit as-is.
3. `{!!maybeName && <List />}` — string / object / nullish: coerce with `!!` first (e.g. `!!myPotentialNullishOrBlankString`).

Only the guard operands (left of the last `&&`) need to be booleans. The last operand is the rendered content and may be any renderable value: `{!isMobile && "Last 30 days"}` and `{isOpen && label}` are fine — never wrap that right-hand side in `!!`.

Keep a real ternary only when **both** branches render something: `{cond ? <A/> : <B/>}`.

**AVOID**: converting back to `cond ? <X/> : null` — that's the old `react/jsx-no-leaked-render` ternary autofix and it reads worse for a single optional branch.

{% include "includes/line_level_issues.md" %}
