`export let currentUser = null;` lets any importer reassign `currentUser` directly, from anywhere, with no way to know who changed it or when. State mutated through a bare exported binding has no single place to observe, validate, or react to a change — every importer is a potential writer.

**What triggers**: an `export let` or `export var` declaration. `export const` and indirect exports (`let x; export { x };`) aren't flagged. No autofix.

**Fix**:

1. Never reassigned after init? Just make it `export const`.
2. Otherwise move the state behind a controlled write path — a `zustand` store (`create<State>()(...)`), a class with private state and explicit setter methods, or a module-private `let` with exported `getCurrentUser()` / `setCurrentUser(user)` functions.

**AVOID**: dodging the rule with `let currentUser = null; export { currentUser };` (identical problem, just invisible to the rule), or exporting a `const` object and mutating its properties (`export const state = { currentUser: null }; state.currentUser = x;`) — same shared mutable state with an extra property-access layer on top.

{% include "includes/line_level_issues.md" %}
