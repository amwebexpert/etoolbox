`obj?.a?.b?.c` with no `?? fallback` leaves the reader guessing what happens when the chain actually comes back `undefined` — does the caller handle it? Does it propagate three more calls deep before something finally breaks? A long optional chain is exactly the place an implicit `undefined` is easiest to lose track of.

**Fix**: end the chain with an explicit fallback — `obj?.a?.b?.c ?? "Unknown"` (or `?? null`, `?? []`, whatever the call site's real default is). This also documents, right at the read site, what the "nothing found" case actually means.

**AVOID**: reflexively appending `?? undefined` just to silence the finding — that restates the exact ambiguity the rule is pointing at, it doesn't resolve it. Pick a real fallback value, or handle the nullish case explicitly with an early return instead.

{% include "includes/line_level_issues.md" %}
