Naming something `useCalculateDiscount` when it's really just a pure function tells every reader "this follows the Rules of Hooks" — it can only be called from a component/hook body, it participates in the render cycle — when none of that is true. The name sets an expectation the function doesn't meet.

**What triggers**: a `function` declaration or variable-assigned arrow named `use[A-Z]…` whose body contains no bare `useX(...)` call. Namespaced calls like `React.useState()` or `store.useSelector()` don't count. No autofix.

**Fix**:

1. It really does use hooks via a namespace (`React.useState`)? Import and call them bare (`import { useState } from "react"; useState(...)`). Then it's a genuine hook and the name is correct.
2. Otherwise rename it to an action verb (`useCalculateDiscount` → `calculateDiscount`) and update every call site.
3. Move it to a `*.utils.ts` file if it isn't in one already. If it lived in a `use-*.ts` file, rename that file to drop the `use-` prefix (e.g. `discount.utils.ts`) and update imports.

**AVOID**: keeping the `use` prefix because callers already use it that way, or adding a throwaway hook call to satisfy the rule. A "hook" name on a plain function invites conditional calls or calls outside components later.

{% include "includes/line_level_issues.md" %}
