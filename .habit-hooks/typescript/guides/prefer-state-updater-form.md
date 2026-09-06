`setNumbers([...numbers, n])` reads `numbers` from the render closure the callback was created in. If two updates to the same state fire before a re-render happens (two fast clicks, a batched update, a `Promise.all` of handlers), both read the *same* stale `numbers` and the second update silently overwrites the first instead of building on it.

**Fix**: use the updater-function form, which always receives the truly-current value regardless of batching — `setNumbers((current) => [...current, n])`. This is strictly safer and costs nothing extra.

**AVOID**: applying this rule to a MemberExpression's *property name* that happens to share the state's name — `setValue(e.target.value)` is not a self-reference; `.value` there is a DOM property, not the `value` state variable. Confirm the identifier is actually being *read*, not used as a key/property name, before rewriting.

{% include "includes/line_level_issues.md" %}
