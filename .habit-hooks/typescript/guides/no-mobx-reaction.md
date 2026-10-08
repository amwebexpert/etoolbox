A MobX `reaction` fires a side effect whenever some observed value changes — from anywhere. Reading the action that changed the state gives no hint that a network call, a save, or another state write follows; debugging means hunting for the reaction that subscribed to it, and ordering or loop bugs only show up at runtime.

**What triggers**: calls to `reaction` imported from `mobx`, including aliased (`import { reaction as react }`) and namespace/default imports (`mobx.reaction(…)`). `autorun`, `computed` and `reaction` from other libraries are not reported. No autofix.

**Fix**:

1. If the reaction derives a value from state: replace it with a `computed` getter on the store (no stored copy, no effect).
2. If it performs a side effect (load, save, sync): call it explicitly from the action(s) that change the observed state, e.g. `setUserId(id) { this.userId = id; this.loadProfile(id); }`.
3. Remove the reaction and its disposer bookkeeping.

**AVOID**: swapping `reaction` for `autorun`, `when`, or `observe`, or wrapping it in a custom `useReaction`-style helper — same implicit side effect, different spelling.

{% include "includes/line_level_issues.md" %}
