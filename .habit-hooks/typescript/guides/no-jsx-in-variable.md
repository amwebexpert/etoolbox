`const labelNode = <span>{label}</span>;` followed by `{labelNode}` in the return gives a piece of markup a variable name instead of a component name — it can't take its own props, can't be tested alone, and the reader has to mentally substitute the variable back into the JSX to see the actual shape of what's rendered.

**What triggers**: any variable declaration whose initializer is directly a JSX element or fragment, in any scope (module, component body, callback). No autofix.

**Fix**:

1. Small, used once? Inline the JSX directly where `{labelNode}` was. Write a conditional inline as `{isVisible && <span>{label}</span>}`.
2. Otherwise extract a component in its own `.tsx` file (`label.tsx`, kebab-case) with a named `LabelProps` interface — `export const Label = ({ label }: LabelProps) => <span>{label}</span>;` — and render `<Label label={label} />`.

**AVOID**: dodges the rule doesn't see but that keep the same smell — `const node = cond ? <A /> : null`, `const node = isOpen && <A />`, `const nodes = [<A />]`. Also avoid PascalCase-renaming the variable (`LabelNode`) without making it a function, and declaring the component inside the parent's body.

{% include "includes/line_level_issues.md" %}
