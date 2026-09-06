`const makeHandler = (id) => () => doThing(id);` declared inside a component is pure logic with zero dependency on the component's state, props, or hooks — it's only inside the component because that's where someone was writing when they needed it. Every render recreates this factory from scratch for no reason tied to rendering at all.

**Fix**: move it to a `*.utils.ts` file as a plain exported function — `export const makeHandler = (id: string) => () => doThing(id);` — and import it where needed. If it's genuinely a one-off single call site with no reuse, an inline one-liner arrow (not a named local factory) is fine; the smell is specifically a *named, curried factory* living inside the component.

**AVOID**: moving it out but leaving it curried when a single flat function would do — if the "outer" parameter is always available at the call site, a plain `(id, event) => doThing(id)` is simpler than a two-step curry.

{% include "includes/line_level_issues.md" %}
