`useCallback` exists to give a stable function *reference* across renders — for event handlers passed to memoized children, or dependencies of another hook. Wrapping a function that renders JSX in `useCallback` borrows that mechanism for a job it wasn't built for: memoizing a render output belongs to `React.memo`/component boundaries, not to a callback-identity hook.

**Fix**: extract the JSX-returning function into an actual `<Component />`. If it genuinely needs referential stability as a *prop* (e.g. passed to a memoized child), wrap the component itself in `React.memo`, not the function that builds its JSX.

**AVOID**: keeping the `useCallback` wrapper "just in case" after extracting the component — a component doesn't need callback-identity stability the way an event handler does; drop it unless a specific memoization need is measured.

{% include "includes/line_level_issues.md" %}
