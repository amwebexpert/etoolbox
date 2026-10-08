`!isNotBlank(name)` or `!(status !== "ready")` forces the reader to flip the meaning twice before they know which branch runs — and that's exactly where inverted-condition bugs hide. A name like `isNotDisabled` bakes the double flip into every usage.

**What triggers**:

- `!` on a negatively named identifier, member or call: `is|are|was|were|has|have|can|could|should|will|does|did` + `Not`/`No` + capital letter (`!isNotReady()`, `!user.hasNoPermissions`, `!canNotEdit`).
- `!` on an inequality: `!(a !== b)`, `!(a != b)`.
- A declared variable, function, class member or interface member named `isNot<NegativeWord>…` (`isNotDisabled`, `isNotInvalidEmail`), using the `antonyms` option (merged with defaults like `Disabled`→`Enabled`, `Hidden`→`Visible`, `Invalid`→`Valid`).
- Not reported: `!!value`, `!isBlank(x)`, `isNotEmpty` (no antonym), object-literal keys. No autofix.

**Fix**:

1. Negated negative name: use the positive counterpart (`!isNotBlank(x)` → `isBlank(x)`, `!user.hasNoPermissions` → `user.hasPermissions`); if none exists, invert the condition and swap the `if`/`else` branches.
2. Negated inequality: use the equality operator (`!(a !== b)` → `a === b`).
3. Double-negative declaration: rename to the positive form (`isNotDisabled` → `isEnabled`), invert its value, and update every usage.

**AVOID**: renaming to a synonym that keeps the negation (`isNotDisabled` → `isNotOff`), or wrapping in a helper like `const isReady = () => !isNotReady()` — the double flip is still there, just moved.

{% include "includes/line_level_issues.md" %}
