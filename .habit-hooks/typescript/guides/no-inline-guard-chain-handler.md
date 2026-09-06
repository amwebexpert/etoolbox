`onPress={() => !disabled && !readonly && doIt()}` packs three decisions — two guard conditions and the actual action — into a single unnamed expression sitting inside a JSX attribute. There's no place to put a comment explaining why each guard exists, and no way to see the logic without reading the attribute value character by character.

**Fix**: extract a named handler with early returns —
```ts
const handleOnPress = () => {
  if (disabled || readonly) return;
  doIt();
};
```
then `onPress={handleOnPress}`. Each guard is now its own line, easy to extend or comment.

**AVOID**: just naming the condition (`const canPress = !disabled && !readonly; onPress={() => canPress && doIt()}`) without extracting a real handler — that relocates the same dense `&&` chain one level up instead of giving each guard its own readable line.

{% include "includes/line_level_issues.md" %}
