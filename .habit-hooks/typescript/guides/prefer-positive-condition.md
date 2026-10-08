`!isReady ? a : b` makes the reader mentally negate the condition before they can tell which branch is the "normal" one — the branch order and the condition's polarity are fighting each other.

**What triggers**: every ternary whose test is a `!` negation. Autofix (`eslint --fix`) drops the `!` and swaps the branches. Only ternaries are checked; `if` guards aren't.

**Fix**: `!isReady ? a : b` → `isReady ? b : a` (autofix does this). In JSX, when one branch is `null`, don't keep a ternary at all — `!x ? <A /> : null` becomes `{!x && <A />}`.

**AVOID**: accepting the autofix's `x ? null : <A />` in JSX — rewrite it as `{!x && <A />}` (use `isBlank(x)` from ts-common when `x` is a string).

{% include "includes/line_level_issues.md" %}
