`enum Foo { A, B }` assigns `0` and `1` implicitly. That's fine until someone inserts a member in the middle, or reorders them for readability — every ordinal downstream silently shifts, and if any of those values are persisted (a DB column, an API payload, a URL param), old data now decodes to the wrong member.

**What triggers**: every enum member without an explicit initializer, reported per member. No autofix.

**Fix**: give every member an explicit value — `enum Foo { A = 0, B = 1 }` (or string values, `A = "a"`). If the values may already be persisted, keep the current implicit ordinals (`0`, `1`, …) so existing data still decodes correctly.

**AVOID**: leaving the first member implicit (`enum Foo { A, B = 2 }`) — `A` still depends on its position — or renumbering existing members while adding initializers.

{% include "includes/line_level_issues.md" %}
