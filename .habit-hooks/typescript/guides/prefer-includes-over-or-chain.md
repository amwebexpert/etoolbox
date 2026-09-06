`x === "a" || x === "b" || x === "c"` repeats `x` once per option — every time someone adds an option they have to remember to copy the whole `x === ...` pattern again, not just add a value.

**Fix**: `["a", "b", "c"].includes(x)` — the comparison target appears once, the option set is just a list. This is autofixable (`eslint --fix`).

**AVOID**: converting a chain where the operands aren't actually comparing the same value (e.g. mixed variables) — the rule only fires when every branch compares the identical left-hand side, so a false match here would be a bug in the rule itself, not a case to force-fit.

{% include "includes/line_level_issues.md" %}
