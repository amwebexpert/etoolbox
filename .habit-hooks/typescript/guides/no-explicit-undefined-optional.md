`| undefined` on a parameter, property, or class field says the same thing TypeScript's `?` already says, in a second syntax the reader has to parse separately. Say "optional" once, with `?`.

**What triggers**: a `T | undefined` union annotating a function/method/constructor parameter, an interface/type-literal property, or a class field — and `?: T | undefined`, where the `| undefined` is redundant. Default-valued, destructured and rest parameters are exempt; variables and return types are never touched. Autofix only when a single type remains once `undefined` is removed (`string | number | undefined` must be fixed by hand).

**Fix**:

1. Drop `| undefined` and add `?` — `(a: string | undefined) =>` → `(a?: string) =>`; `age: number | undefined` → `age?: number`.
2. Already `age?: number | undefined`? Delete the `| undefined`, keep the `?`.
3. A parameter followed by a required one can't take `?` (TS error). Fold the params into a single args object with a named interface (`interface LoadArgs { id?: string; force: boolean }`) — the house one-param shape — or reorder so optional params come last.
4. If the project enables `exactOptionalPropertyTypes` and callers explicitly assign `undefined`, `?: T` alone rejects that — keep `?: T | undefined` and add `// eslint-disable-next-line coding-guide/no-explicit-undefined-optional -- exactOptionalPropertyTypes: callers assign undefined`.

**AVOID**: marking a value optional that every real caller always supplies — the honest fix there is dropping the union entirely.

{% include "includes/line_level_issues.md" %}
