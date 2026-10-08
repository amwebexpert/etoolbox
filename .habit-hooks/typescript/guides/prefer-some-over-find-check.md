`arr.find(cb) !== undefined` finds and holds onto the matching element just to immediately throw it away and keep only a boolean. It also reads as "get me the item", making a reader wonder why the item itself is never used.

**What triggers**: `.find(...)` compared with `===`/`!==` to `undefined` (either side), and `!x.find(...)`. Autofix (`eslint --fix`) rewrites to `x.some(...)` / `!x.some(...)`.

**Fix**: `arr.some(cb)` — it short-circuits the same way and returns the boolean the call site actually uses (`=== undefined` → `!arr.some(cb)`).

**AVOID**: applying the fix to a `.find` that isn't `Array.prototype.find` — the rule matches any method named `find`, so an ORM/repository/query `.find(...)` (returns a promise or cursor, no `.some`) is a false positive. Disable the line with a reason instead. Also avoid keeping `.find` because "the item might be needed later".

{% include "includes/line_level_issues.md" %}
