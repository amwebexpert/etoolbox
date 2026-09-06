`export let currentUser = null;` lets any importer reassign `currentUser` directly, from anywhere, with no way to know who changed it or when. State mutated through a bare exported binding has no single place to observe, validate, or react to a change — every importer is a potential writer.

**Fix**: move the state into a dedicated state layer with a controlled write path — a `zustand` store (`create<State>()(...)`), a class with private state and explicit setter methods, or at minimum a getter/setter pair (`getCurrentUser()` / `setCurrentUser(user)`) instead of a raw mutable export.

**AVOID**: "fixing" this by exporting a `const` object and mutating its properties instead (`export const state = { currentUser: null }; state.currentUser = x;`) — that's the identical problem with an extra property-access layer on top, not a real fix.

{% include "includes/line_level_issues.md" %}
