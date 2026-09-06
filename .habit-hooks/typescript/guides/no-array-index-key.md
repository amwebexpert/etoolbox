`key={index}` gives React no way to tell "this item moved" apart from "this item changed" — when the list reorders, filters, or gets an item removed from the middle, React matches the wrong DOM node to the wrong data by position, which shows up as stale form state, wrong item highlighted, or broken animations on reorder.

**Fix**: key by something that identifies the *item*, not its position — `key={item.id}` (or another field that's stable and unique across re-renders). If the data genuinely has no stable identifier and truly never reorders/filters, a content-derived key (e.g. a hash of the row's own fields) is still safer than the index.

**AVOID**: `key={\`${item.name}-${index}\`}` as a middle ground — appending the index still ties identity to position and reintroduces the same bug the moment the list reorders.

{% include "includes/line_level_issues.md" %}
