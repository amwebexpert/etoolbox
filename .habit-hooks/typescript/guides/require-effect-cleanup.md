`useEffect(() => { setInterval(tick, 1000); }, [])` starts a timer every time the effect runs and never stops it. Each remount (or each dependency change) leaves the previous interval/listener/subscription still firing in the background — a leak that keeps calling `tick` against a component that may no longer even be mounted.

**Fix**: return a cleanup function that undoes exactly what the effect set up —
```ts
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```
Same pattern for `addEventListener` (`return () => el.removeEventListener(...)`) and subscriptions (`return () => subscription.unsubscribe()`).

**AVOID**: adding a cleanup function that doesn't actually tear down the same resource the effect created (e.g. clearing the wrong interval id, or unsubscribing from a different subscription) — verify the cleanup references the exact value the setup produced.

{% include "includes/line_level_issues.md" %}
