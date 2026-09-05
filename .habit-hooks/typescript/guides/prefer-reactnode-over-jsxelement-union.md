`JSX.Element | null | undefined` spells out, by hand, exactly the set of things `ReactNode` already means: something React can render, or nothing. Writing the union out longhand also under-covers what a component can actually return — strings, numbers, arrays of elements, and fragments are all valid render output that `JSX.Element` alone doesn't include.

**Fix**: use `ReactNode` — it already covers `null`/`undefined` plus every other renderable shape, so the explicit union collapses to one type. Autofixable (`eslint --fix`) when `ReactNode` is already imported from `"react"` in the file; otherwise add the import first.

**AVOID**: reaching for `ReactNode` when the prop is deliberately narrower — a prop that must specifically be a single element (e.g. for `React.cloneElement`) is correctly typed as `ReactElement`, not widened to `ReactNode` just to satisfy this rule.

{% include "includes/line_level_issues.md" %}
