`!isNotBlank(name)`, `!(status !== "ready")` or a flag named `isNotDisabled` make the reader flip the meaning twice before knowing what the code checks — easy to misread, especially inside an `if`/`else`.

**Fix**: use the positive form.
1. Negated negative helper / member → its positive counterpart: `!isNotBlank(x)` → `isBlank(x)`, `!user.hasNoPermissions` → `user.hasPermissions`.
2. Negated inequality → equality: `!(a !== b)` → `a === b`.
3. Negative name → positive name (and flip its value): `isNotDisabled` → `isEnabled`, `isNotInvalidEmail` → `isValidEmail`.
4. When the negation guards an `if`/`else`, invert the condition and swap the branches so the code reads naturally.

`!!value` (boolean coercion) is fine and not reported.

**AVOID**: renaming a variable to the positive form without inverting every place it is assigned and read — that silently flips the logic.

{% include "includes/line_level_issues.md" %}
