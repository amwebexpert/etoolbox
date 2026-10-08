A `.tsx` file with two module-level components — exported or file-private — makes ownership unclear: which name matches the filename, which file do you open to change a piece of UI, and which component is the real public surface?

**What triggers**: in a `.tsx` file only, every module-level PascalCase function that returns JSX — `const X = () => …`, `function X()`, or an `export default` function/arrow — after the first one. The first in source order is treated as primary; exported or not doesn't matter. Components nested inside another function's body aren't counted. No autofix.

**Fix**:

1. Keep the one component whose name matches the filename (`widget.tsx` → `Widget`).
2. Move every other component into its own kebab-case `.tsx` file (`WidgetHeader` → `widget-header.tsx`) along with its named `WidgetHeaderProps` interface. Export it there and import it back.

**AVOID**: keeping an "internal only" subcomponent in the file because it isn't exported, since it still counts. Also avoid dodging by moving it inside the parent component's body, which is worse because it gets a new type every render and remounts.

{% include "includes/line_level_issues.md" %}
