A function named `useFoo` that returns JSX blurs the one clean separation React gives you for free: hooks own data and behaviour, components own rendering. Once a "hook" returns markup, every caller has to render its result specially, it can't be tested as pure data, and the name now lies about what kind of thing it is.

**What triggers**: a `function` declaration or variable-assigned arrow named `use[A-Z]…` whose concise body is JSX, or that contains a `return <…/>` (returns inside nested functions don't count). No autofix.

**Fix**:

1. Callers just render the result? It's a component: rename `useFoo` → `Foo`, move it to its own `foo.tsx` (kebab-case, no `use-` prefix; rename the old `use-foo.tsx`), type its inputs with a named `FooProps` interface, and render `<Foo {...} />` at the call sites. Keep any hook calls inside it — components may call hooks; if it calls none, that's fine too.
2. It mixes data and markup? Split it: `useFoo` returns data (`{ items, isLoading }`), and a `Foo` component in its own `.tsx` file consumes it and renders.
3. Update every import and call site.

**AVOID**: workarounds that hide the markup from the rule — `return cond ? <A /> : null`, returning `{ node: <A /> }`, or returning a render function. The hook still produces UI. Also avoid declaring the new component inside another component's body, which is worse because it remounts on every render.

{% include "includes/line_level_issues.md" %}
