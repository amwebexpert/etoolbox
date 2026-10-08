`x === "a" || x === "b" || x === "c"` repeats `x` once per option — every time someone adds an option they have to remember to copy the whole `x === ...` pattern again, not just add a value.

**What triggers**: an `||` chain of 2+ operands where every operand is `===`/`==` against a literal on the right-hand side, all with the same left-hand side. Autofix (`eslint --fix`) rewrites it to `["a", "b", "c"].includes(x)`.

**Fix**:

1. Apply the autofix, or write `["a", "b", "c"].includes(x)` by hand.
2. If `x` is nullable or wider than the array's element type, `includes` may raise a TS error. Narrow first (`!isNullish(x) && [...].includes(x)` with `isNullish` from `@lichens-innovation/ts-common`), or type the list explicitly.
3. List reused or long? Hoist it to module scope as a SCREAMING_SNAKE_CASE constant (`const EDITABLE_STATUSES: Status[] = [...]`).

**AVOID**: silencing the TS error with a cast (`x as Status`) instead of narrowing it.

{% include "includes/line_level_issues.md" %}
