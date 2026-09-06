`enum Foo { A, B }` assigns `0` and `1` implicitly. That's fine until someone inserts a member in the middle, or reorders them for readability — every ordinal downstream silently shifts, and if any of those values are persisted (a DB column, an API payload, a URL param), old data now decodes to the wrong member.

**Fix**: give every member an explicit value — `enum Foo { A = 1, B = 2 }`. Adding, removing, or reordering members afterward can no longer change an existing member's value by accident.

**AVOID**: "fixing" this by leaving the first member implicit (`enum Foo { A, B = 2 }`) — `A` still silently depends on being first in the list.

{% include "includes/line_level_issues.md" %}
