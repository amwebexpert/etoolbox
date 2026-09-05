`const labelNode = <span>{label}</span>;` followed by `{labelNode}` in the return gives a piece of markup a variable name instead of a component name — it can't take its own props, can't be tested alone, and the reader has to mentally substitute the variable back into the JSX to see the actual shape of what's rendered.

**Fix**: declare a small named component instead — `const Label = ({ label }: LabelProps) => <span>{label}</span>;` then use `<Label label={label} />`. If it's genuinely a one-off with no reuse potential and the surrounding JSX is small, inlining the JSX directly (no intermediate variable at all) is often simpler than either option.

**AVOID**: renaming the variable to look more component-like (e.g. `LabelNode` in PascalCase) without actually converting it into a function — that doesn't grant it any of the real benefits of being a component.

{% include "includes/line_level_issues.md" %}
