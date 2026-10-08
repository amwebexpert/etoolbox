`const OPTIONS = [...]` declared inside a component or hook body, with no reference to props/state/anything from that scope, gets rebuilt from scratch on every single render — identical array, identical objects, every time — for data that never actually changes.

**What triggers**: a non-empty array or object literal assigned to an identifier directly in the body of a component (PascalCase function) or hook (`use[A-Z]…`), when nothing inside it references a binding declared in that function. Declarations inside nested blocks or callbacks, empty `[]`/`{}`, and wrapped literals (`[...] as const`) are skipped. No autofix.

**Fix**:

1. Move the declaration to module scope, above the component, and rename it SCREAMING_SNAKE_CASE (`const options = [...]` → `const STATUS_OPTIONS = [...]`).
2. Update the references in the body. It's now built once, and it's a stable dependency for any `useEffect`/`useMemo` that lists it.

**AVOID**: hoisting a literal that only _looks_ static — the rule only checks for local bindings, so it also fires on values that must be fresh per render (`{ createdAt: Date.now() }`, `new Date()`, `Math.random()`) or on literals the body mutates later (`.push(...)`, property assignment), where hoisting would share one mutated instance across renders and component instances. Keep those local and disable the line with a reason.

{% include "includes/line_level_issues.md" %}
