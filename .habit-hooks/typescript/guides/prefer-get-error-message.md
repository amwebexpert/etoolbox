`error instanceof Error ? error.message : String(error)` is re-written by hand in every `catch`, each copy handling a slightly different subset of cases (non-`Error` objects with a `message`, strings, empty values…).

**Fix**: use `getErrorMessage(error)` from `@lichens-innovation/ts-common`:
```ts
import { getErrorMessage } from "@lichens-innovation/ts-common";

catch (error) {
  notify(getErrorMessage(error));
}
```

**AVOID**: wrapping the manual ternary in a local `toMessage` helper — import the shared one.

{% include "includes/line_level_issues.md" %}
