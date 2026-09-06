`text={"Click me"}` wraps a static string in a JSX expression container for no reason — it reads as if the value might be dynamic when it never is, and it's one extra pair of braces a reader has to see through.

**Fix**: use a plain quoted attribute for a static string — `text="Click me"`. This is autofixable (`eslint --fix`).

**AVOID**: removing braces around something that actually is an expression (a variable, a template literal, a ternary) — the rule only targets literal static strings; don't hand-apply this pattern beyond what the autofix already changed.

{% include "includes/line_level_issues.md" %}
