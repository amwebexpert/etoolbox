`{items.filter(isActive).sort(byName).map((item) => <Row key={item.id} item={item} />)}` runs a whole data pipeline inline in the template, on every render, where the filtering/sorting step can't be named, tested, or reused — and a reader scanning the JSX has to parse it before they even get to what's rendered.

**What triggers**: a JSX expression (child or attribute value) whose expression ends in 2+ chained `.filter`/`.sort`/`.map`/`.reduce` calls. A single `.map(...)` is fine. No autofix.

**Fix**:

1. Compute the list in a named variable above the `return`: `const visibleItems = items.filter(isActive).sort(byName);` (move reusable predicates/comparators to a `*.utils.ts` file).
2. Render with a single map: `{visibleItems.map((item) => <Row key={item.id} item={item} />)}`.
3. Write the map callback inline as above. `.map(renderRow)` with a locally declared `renderRow` trips `no-inline-render-function`.

**AVOID**: moving the chain into a local `render*` helper or a JSX-holding variable — both are flagged by sibling rules (`no-inline-render-function`, `no-jsx-in-variable`).

{% include "includes/line_level_issues.md" %}
