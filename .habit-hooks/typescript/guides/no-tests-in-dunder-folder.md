A test tucked away in a `__tests__/` folder separates it from the source file it exercises — renaming, moving, or deleting the source file gives no signal that a test elsewhere now references a path that no longer exists, and a reader opening the source file has no visual cue that a test for it exists at all.

**Fix**: move the test next to its source file as `<name>.test.ts(x)` (or `.spec.ts(x)`) — same folder, same base name. The two files now move, rename, and get reviewed together.

**AVOID**: leaving the `__tests__` folder in place "for now" with only some tests migrated out of it — a half-migrated convention is worse than a consistent one; migrate the whole folder in one pass once you start.

{% include "includes/line_level_issues.md" %}
