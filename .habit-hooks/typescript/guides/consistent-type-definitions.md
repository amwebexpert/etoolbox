`type Foo = { ... }` and `interface Foo { ... }` look interchangeable for a plain object shape, but picking one consistently matters: `interface` supports declaration merging and reads unambiguously as "the shape of a thing", while `type` is reserved for what only it can express — unions, mapped types, `Record<K, V>`, tuples. Mixing both for plain object shapes means a reader has to remember which one to reach for.

**Fix:**
1. Plain object shape → `interface Foo { ... }`.
2. Genuinely needs `type` (union, intersection with a primitive, mapped type, `Record`) → keep `type`, this rule won't flag it.
3. Apply the autofix (`eslint --fix`) — this specific conversion is mechanical and safe for a plain object literal type.

**AVOID**: converting a `type` alias that's actually a union or intersection just because the rule fired nearby — check what changed before assuming every hit is the same shape.

{% include "includes/line_level_issues.md" %}
