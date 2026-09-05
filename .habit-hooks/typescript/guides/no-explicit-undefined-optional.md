`| undefined` on a parameter, property, or class field says the same thing TypeScript's `?` already says, in a second syntax the reader has to parse separately. Worse, the two aren't quite identical: `?` means "may be omitted", while an explicit `| undefined` union still requires the key to be present with the literal value `undefined` under `exactOptionalPropertyTypes` — spelling it out as a union invites that mismatch instead of just declaring the thing optional.

**Say "optional" once, with `?`:**
1. On a function/method parameter: drop `| undefined` from the type and add `?` after the name — `(a: string | undefined) =>` becomes `(a?: string) =>`.
2. On an interface/type-literal property or class field: same swap — `age: number | undefined` becomes `age?: number`.
3. Already `age?: number | undefined`? The `| undefined` is now redundant noise next to the `?` — delete it, keep the `?`.
4. Variable declarations and return types have no `?` equivalent — leave `| undefined` alone there; this rule (and its autofix) only touches params and properties.

**AVOID**: reaching for this fix without checking whether the value is optional at all. If every real caller already always supplies it, the honest fix is dropping the union entirely, not marking a required value as optional just to satisfy the rule.

{% include "includes/line_level_issues.md" %}
