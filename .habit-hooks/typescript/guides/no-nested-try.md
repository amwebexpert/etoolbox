A `try` inside another `try`'s block or `catch` handler means two separate error-recovery paths are interleaved in one place — a reader has to work out which failure a given `catch` actually handles, and which errors from the inner block can still escape to the outer one.

**Fix**: flatten into one `try` with a single `catch` that branches on what went wrong (an error class, a `code` field, or simply separate `try` statements placed *sequentially*, not nested, if the two operations are genuinely independent steps that each need their own handling).

**AVOID**: flattening by wrapping everything in one bare `catch` that swallows both failure modes identically — if the two errors need different handling, keep that distinction in the flattened version (via `instanceof` checks or separate sequential `try` blocks), don't lose it.

{% include "includes/line_level_issues.md" %}
