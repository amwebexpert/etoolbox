`useRef<HTMLDivElement>(null)` hand-picks a DOM interface that has to stay in sync with whatever tag the ref actually gets attached to in the JSX — rename the element from a `<div>` to a `<span>` and this type silently goes stale; nothing catches the mismatch.

**What triggers**: `useRef<HTMLXxxElement>(...)` with an `HTML*Element` type argument. The message names the replacement (`ComponentRef<"div">`). Types without a single known tag (`HTMLHeadingElement`, `HTMLDialogElement`, …) are reported without a tag. Autofix only when `ComponentRef` is already imported from `"react"`. Don't use `ElementRef`: `@types/react` marks it `@deprecated` in favour of `ComponentRef`.

**Fix**:

1. `import type { ComponentRef } from "react";`
2. `useRef<HTMLDivElement>(null)` → `useRef<ComponentRef<"div">>(null)`.
3. Message gives no tag? Pick the tag the ref is actually attached to in the JSX (`ComponentRef<"dialog">`, `ComponentRef<"h2">`).

**AVOID**: `ComponentRef<"custom-tag">` for a ref into a custom React component — string tags target native elements; use `ComponentRef<typeof ThatComponent>` or that component's own exported ref type.

{% include "includes/line_level_issues.md" %}
