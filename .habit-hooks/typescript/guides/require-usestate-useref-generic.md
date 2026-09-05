`useState()` with no argument, or `useRef(null)`, gives TypeScript nothing to infer a useful type from — the binding ends up typed as `undefined` or `null` forever, which means every later assignment either needs an unsafe cast or silently widens the type to `any`-adjacent territory the first time someone assigns a real value.

**Fix**: say what the value will eventually be — `useState<Item[]>([])`, `useRef<ElementRef<"div">>(null)`. The initial value can still be empty/null; the generic is what makes every later read and write type-checked against the real shape.

**AVOID**: reaching for `useState<any>()` to silence this quickly — that satisfies the rule's letter while giving up exactly the type safety it exists to protect; write the real type.

{% include "includes/line_level_issues.md" %}
