Naming something `useCalculateDiscount` when it's really just a pure function tells every reader "this follows the Rules of Hooks" — it can only be called from a component/hook body, it participates in the render cycle — when none of that is true. The name sets an expectation the function doesn't meet.

**Fix**: rename it to what it actually is — an action-verb name, `calculateDiscount` — and put it in a `*.utils.ts` file if it doesn't already live in one. Nothing about its behavior changes; only the name and, if applicable, its location.

**AVOID**: keeping the `use` prefix because callers already use it that way — the fix is the rename, including at call sites; a "hook" name on a plain function invites someone to eventually call it conditionally or outside a component, which will then genuinely break Rules-of-Hooks assumptions elsewhere.

{% include "includes/line_level_issues.md" %}
