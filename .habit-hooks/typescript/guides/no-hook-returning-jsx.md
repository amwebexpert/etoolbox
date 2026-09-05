A function named `useFoo` that returns JSX blurs the one clean separation React gives you for free: hooks own data and behaviour, components own rendering. Once a "hook" returns markup, every caller has to render its result specially, it can't be tested as pure data, and the name now lies about what kind of thing it is.

**Fix**: split the two responsibilities. The hook returns the data the UI needs (`{ items, isLoading }`); a component (named like a component, `<Foo />` — not `useFoo`) consumes that data and renders it.

**AVOID**: keeping the `use` prefix "because it's still kind of a hook" — if it returns JSX, name it and treat it like the component it actually is.

{% include "includes/line_level_issues.md" %}
