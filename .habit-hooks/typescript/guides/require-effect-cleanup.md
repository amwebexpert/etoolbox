`useEffect(() => { setInterval(tick, 1000); }, [])` starts a timer every time the effect runs and never stops it. Each remount (or each dependency change) leaves the previous interval/listener/subscription still firing in the background — a leak that keeps calling `tick` against a component that may no longer even be mounted.

**What triggers**: a `useEffect` with a block-body inline callback that directly calls `setInterval`, `setTimeout`, `addEventListener` or `subscribe` (bare or as a method, e.g. `window.addEventListener`, `store.subscribe`), and has no top-level `return () => {…}`. Calls inside nested functions in the effect don't count. No autofix.

**Fix**: return an inline cleanup function at the top level of the effect body that undoes exactly what the effect set up —

```ts
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```

Same pattern for `setTimeout` (`clearTimeout(id)`), `addEventListener` (`return () => el.removeEventListener(...)`) and subscriptions (`return () => unsubscribe()`). `return unsubscribe;` (a bare identifier) or a `return` inside an `if` is still flagged, so wrap it as `return () => unsubscribe();`.

**AVOID**: a cleanup that doesn't tear down the same resource the effect created (wrong interval id, a different listener function reference, another subscription) — the cleanup must reference the exact value the setup produced.

{% include "includes/line_level_issues.md" %}
