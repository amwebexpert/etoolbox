`!isReady ? a : b` makes the reader mentally negate the condition before they can tell which branch is the "normal" one — the branch order and the condition's polarity are fighting each other.

**Fix**: drop the `!` and swap the branches — `isReady ? b : a`. The condition now reads as a direct statement of what's true, and the first branch is the one that fires when it is.

**AVOID**: doing this mechanically on a condition that's genuinely more natural negated in context (e.g. an early-return guard clause, which this rule doesn't target — it only fires on ternaries) — use judgment on whether the swap actually reads better here.

{% include "includes/line_level_issues.md" %}
