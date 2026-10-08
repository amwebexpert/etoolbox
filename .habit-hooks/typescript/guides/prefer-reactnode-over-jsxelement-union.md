`JSX.Element | null | undefined` spells out, by hand, roughly what `ReactNode` already means: something React can render, or nothing — while under-covering it, since strings, numbers, arrays and fragments are all valid render output that `JSX.Element` alone doesn't include.

**What triggers**: any union that contains `JSX.Element` or `ReactElement` together with `null` and/or `undefined` — prop types, return types, variables alike (`ReactElement | null` is flagged too). Autofix to `ReactNode` only when `ReactNode` is already named-imported from `"react"`.

**Fix**:

1. Any renderable is fine (the usual case): replace the union with `ReactNode` and add `import type { ReactNode } from "react";` if missing. This applies to return types as well (`(): ReactNode`).
2. Deliberately a single element (e.g. for `cloneElement`) and just optional: drop the union and use `?` — `icon?: ReactElement`.

**AVOID**: widening a deliberately-narrow `ReactElement` prop to `ReactNode`, or keeping `ReactElement | undefined` next to a `?`.

{% include "includes/line_level_issues.md" %}
