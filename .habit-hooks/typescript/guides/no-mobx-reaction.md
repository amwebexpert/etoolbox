A MobX `reaction` runs a side effect implicitly whenever some observed state changes. Nothing at the place where the state changes says that something else will now happen, so the data flow is invisible: debugging "why did this load fire?" means hunting for every reaction that might observe it.

**Fix**:
1. If the reaction derives a value → replace it with a `computed` getter.
2. If it triggers a side effect → call that effect explicitly from the action that changes the state (e.g. `setUserId(id)` sets the field **and** calls `this.loadProfile(id)`).

**AVOID**: swapping `reaction` for `autorun` or a `useEffect` that watches the same observable — same implicit trigger, different name.

{% include "includes/line_level_issues.md" %}
