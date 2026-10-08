`obj?.a?.b?.c` with no `?? fallback` leaves the reader guessing what happens when the chain actually comes back `undefined` — does the caller handle it? Does it propagate three more calls deep before something finally breaks? A long optional chain is exactly the place an implicit `undefined` is easiest to lose track of.

**What triggers**: an optional chain with at least `minDepth` `?.` links (member or call; default `3`, minimum `2`) that isn't the direct left operand of `??`. An early return, an `if` check, or `|| fallback` don't satisfy it. No autofix.

**Fix**:

1. End the chain with a real default — `obj?.a?.b?.c ?? "Unknown"` (or `?? null`, `?? []`, whatever the call site's actual default is).
2. Alternatively, when an intermediate value is meaningful on its own, split the chain into a named variable: `const address = user?.profile?.address;` then `address?.city ?? "Unknown"`.

**AVOID**: `?? undefined` just to silence the finding (it restates the ambiguity), or `|| fallback`, which isn't accepted and also swallows `0`/`""`/`false`.

{% include "includes/line_level_issues.md" %}
