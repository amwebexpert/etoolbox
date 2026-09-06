`{items.filter(isActive).sort(byName).map(renderRow)}` runs three passes over the list on every render, inline in the template, where the filtering/sorting logic can't be named, tested, or reused — and where a reader scanning the JSX has to parse a data pipeline before they even get to what's rendered.

**Fix**: precompute the list above the `return`, using named helpers imported from `*.utils.ts` (`canDisplayFilter`, `comparator`) — `const visibleRows = items.filter(canDisplayFilter).sort(comparator);` then `{visibleRows.map(renderRow)}` in the JSX. The JSX now shows only "map this list to rows"; the filtering/sorting logic has a name and a home.

**Not the same thing (won't fire here)**: a single `.map(...)` to render a list — that's the normal, idiomatic way to render a collection in JSX and isn't itself a smell; this rule only targets *chains* of 2+ array methods squeezed into one JSX expression.

{% include "includes/line_level_issues.md" %}
