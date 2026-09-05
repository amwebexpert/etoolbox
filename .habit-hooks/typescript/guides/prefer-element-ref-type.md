`useRef<HTMLDivElement>(null)` hand-picks a DOM interface that has to stay in sync with whatever tag the ref actually gets attached to in the JSX — rename the element from a `<div>` to a `<span>` and this type silently goes stale; nothing catches the mismatch.

**Fix**: derive the type from the tag name instead — `useRef<ElementRef<"div">>(null)`. Now the DOM type and the JSX tag are expressed with the same string, so changing the tag and forgetting to update the ref type is at least visibly inconsistent (`"div"` vs a `<span>` two lines down), if not always compiler-caught.

**AVOID**: reaching for `ElementRef<"custom-tag">` on a custom React component (as opposed to a native DOM tag) — `ElementRef` targets native element tags; a ref into a custom component's own forwarded ref type should use that component's own exported ref type instead.

{% include "includes/line_level_issues.md" %}
