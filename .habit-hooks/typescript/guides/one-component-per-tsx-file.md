A `.tsx` file with two module-level components — exported or file-private — makes ownership unclear: which name matches the filename, which file do you open to change a piece of UI, and which component is the real public surface? Private helpers (`const WidgetHeader = () => …` next to `export const Widget`) still count; nesting a helper inside another component's body does not.

**Fix**: keep one PascalCase `const` whose arrow function returns JSX per `.tsx` file. Move every other module-level component into its own file (e.g. `widget-header.tsx`) and import it.

**AVOID**: leaving a "internal only" subcomponent in the same file because it is not exported — the rule treats non-exported module-level components the same as exported ones.

{% include "includes/line_level_issues.md" %}
