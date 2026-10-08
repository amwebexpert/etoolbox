`value !== null && value !== undefined` says "isn't nullish" in the longest possible way, and it's easy to get subtly wrong (typo one side into `===`, or compare against the wrong variable on the second clause) without it looking obviously broken.

**What triggers**: `x !== null && x !== undefined` and `x === null || x === undefined` (either order, same left-hand expression, `null`/`undefined` on the right). No autofix.

**Fix**: `import { isNullish } from "@lichens-innovation/ts-common";` then replace the `&&` pair with `!isNullish(value)` and the `||` pair with `isNullish(value)`. There is no `isNotNullish` helper, so use `!isNullish(...)`.

**AVOID**: inventing an `isNotNullish` helper, or using this helper for a check that isn't purely nullish — `value === "" || value === undefined` is a blank-or-missing check, so use `isBlank`/`isNotBlank` from the same package.

{% include "includes/line_level_issues.md" %}
