`setNumbers([...numbers, n])` reads `numbers` from the render closure the callback was created in. If two updates to the same state fire before a re-render happens (two fast clicks, a batched update, a `Promise.all` of handlers), both read the _same_ stale `numbers` and the second update silently overwrites the first instead of building on it.

**What triggers**: a `setX(arg)` call (identifier `set[A-Z]…`, one non-function argument) whose argument references an identifier named like the state — the setter name minus `set`, first letter lowercased (`setUser` → `user`). Property names (`e.target.value`) and object keys aren't counted. No autofix.

**Fix**: use the updater-function form, which always receives the current value regardless of batching — `setNumbers((current) => [...current, n])`.

**AVOID**: converting a false positive to the updater form. The real false positive is a local variable or parameter that _shadows_ the state name — `users.forEach((user) => setUser(user))` doesn't read state at all. Rename the shadowing binding instead (`(nextUser) => setUser(nextUser)`).

{% include "includes/line_level_issues.md" %}
