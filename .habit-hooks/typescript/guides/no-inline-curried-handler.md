`const makeHandler = (id) => () => select(id);` inside a component is a function that builds functions: a reader has to mentally apply it twice (`onPress={makeHandler(item.id)}`) to see what actually runs on press, and every render rebuilds both layers. The extra indirection buys nothing over writing the handler where it is used.

**What triggers**: a `const`/`let` variable whose initializer is a curried arrow — either a concise body that is itself an arrow (`(id) => () => ...`) or a block body with a top-level `return () => ...` — declared directly in any function scope (component, hook, or plain function). Module-scope declarations are not flagged. No autofix.

**Fix**:

1. Usual case — the factory closes over component state (`setSelected`, props, hooks): delete it and write the arrow at the call site: `onPress={() => select(item.id)}`.
2. If the per-item handler is non-trivial or repeated in a list, extract a child component that receives `id` (named `<Name>Props` interface, its own `.tsx` file) and defines `const handlePress = () => select(id);` itself.
3. Only if the factory is truly pure (no state, props, or hooks) may it move to module scope / a `*.utils.ts` file.

**AVOID**:

- Moving a factory that uses `setState`/props to module scope by threading them through as extra params — that breaks `max-params-project`; a flat `(id, event) => ...` util has the same problem.
- Rewriting it as a `function` expression, wrapping it in `useCallback`, or nesting the declaration in an inner `{ }` block — all silence the rule while keeping the same curried factory.

{% include "includes/line_level_issues.md" %}
