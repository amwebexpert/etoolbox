`useCallback` exists to give a stable function _reference_ across renders — for event handlers passed to memoized children, or dependencies of another hook. Wrapping a function that renders JSX in `useCallback` borrows that mechanism for a job it wasn't built for: memoizing a render output belongs to `memo`/component boundaries, not to a callback-identity hook.

**What triggers**: `useCallback(fn, deps)` where the inline `fn` returns JSX, **or** where the result is assigned to a variable whose name matches `/^render/i` — even if it returns no JSX. No autofix.

**Fix**:

1. Returns JSX: extract it into a component in its own `.tsx` file (kebab-case, e.g. `row.tsx`) with a named `RowProps` interface, and render `<Row {...} />`. If it really needs referential stability as a prop of a memoized child, wrap the component in `memo`.
2. No JSX, just a `render*` name: rename the variable to what it actually does (`handleRowPress`, `getRowLabel`).
3. Library render props (e.g. FlatList `renderItem`): write the arrow inline in the attribute or use a module-level function. A local `const renderItem = ...` trips `no-inline-render-function`.

**AVOID**: keeping the `useCallback` wrapper "just in case" after extracting the component, and declaring the extracted component inside the parent's body, which is worse because it remounts every render.

{% include "includes/line_level_issues.md" %}
