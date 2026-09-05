`arr.find(cb) !== undefined` finds and holds onto the matching element just to immediately throw it away and keep only a boolean. It also reads as "get me the item", making a reader wonder why the item itself is never used.

**Fix**: say what you actually mean — `arr.some(cb)`. It short-circuits the same way `find` does, and the boolean return type matches what the call site actually does with it.

**AVOID**: keeping `.find(...)` because "it might be needed later" — if you later need the element itself, that's the moment to switch back to `.find`, not before.

{% include "includes/line_level_issues.md" %}
