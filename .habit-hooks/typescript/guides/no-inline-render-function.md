`{renderTextInputIcon()}` inline in a template calls a helper that lives right next to it in the same file, doing exactly what a component does — return JSX from props — without any of the tooling that comes with being a real component: no props typing surfaced at the call site, no ability to test it in isolation, no React DevTools entry.

**Fix**: promote it to a real subcomponent — `<TextInputIcon {...args} />` — with its own typed props interface. If it only ever needs the values already in scope, passing them as explicit props (rather than relying on closure) also makes its dependencies visible from the call site.

**Not the same thing (won't fire here)**: a `render*`-named function received as a *prop* (a render-prop pattern, e.g. `renderRow` passed into a list component) — that's an established, legitimate customization pattern, not a locally-declared helper that could be extracted.

{% include "includes/line_level_issues.md" %}
