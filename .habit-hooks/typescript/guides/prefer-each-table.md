`it.each([["PROGRESS: 0", 0], ["PROGRESS: 42", 42]])` makes the reader count positions to know what each value means, and the title only gets positional `%s` placeholders. Swapping two columns, or adding one in the middle, silently shifts every case without any name to catch it.

**What triggers**: `.each([...])` on a chain rooted at `it`, `test` or `describe` (`it.only.each`, `test.concurrent.each`…) when the argument is a non-empty array whose rows are all arrays. Arrays of primitives or objects, and variables (`it.each(cases)`), are not reported.
**Autofix**: yes when unambiguous — params become columns, `%s`/`%d`/`%i`/`%f`/`%j`/`%o`/`%p` become `$name`. No fix when params are typed or not plain identifiers, row lengths differ or rows contain spreads/holes, the title uses `%#` or escapes, or the title isn't a string literal.

**Fix** (when the autofix can't):

1. Rewrite the table as a tagged template: a header row of column names, then one `${value}` row per case, separated by `|`.
2. Replace positional placeholders in the title with `$columnName`.
3. Change the callback to take one destructured object `({ line, expected })`. If the params were typed, declare a named row `interface` and annotate the destructured param with it (`({ line, expected }: ParseCase)`) — no inline object type. Don't pass it as a generic on the template form: Vitest's template `.each` isn't generic.

**AVOID**: converting to an array of objects just to dodge the rule when a table reads better, or moving the tuples into a `const cases = [...]` variable so the rule can't see them — the positional ambiguity is still there.

{% include "includes/line_level_issues.md" %}
