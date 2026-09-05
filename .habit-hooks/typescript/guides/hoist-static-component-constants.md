`const OPTIONS = [...]` declared inside a component or hook body, with no reference to props/state/anything from that scope, gets rebuilt from scratch on every single render — identical array, identical objects, every time — for data that never actually changes.

**Fix**: move the declaration to module scope, above the component. It's built once, ever, and every render just reads the same reference — which also means it's now a stable dependency for any `useEffect`/`useMemo` that lists it, instead of a fresh reference tripping those checks every render.

**AVOID**: hoisting something that *looks* static but actually reads a prop, a piece of state, or another local value — check every value inside the literal before moving it; the rule only fires when nothing inside it depends on the component's own scope.

{% include "includes/line_level_issues.md" %}
