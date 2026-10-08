`{renderTextInputIcon()}` calls a local helper that does exactly what a component does — return JSX from inputs — without any of the tooling that comes with being a real component: no props typing surfaced at the call site, no ability to test it in isolation, no React DevTools entry, and an implicit dependency on whatever it closes over.

**What triggers**: a function named `render[A-Z]…` that returns JSX and is declared _inside another function_ (a component or hook body), plus any call or reference inside JSX to a `render[A-Z]…` variable declared in a function scope — including `{items.map(renderRow)}`. Module-level helpers and render props received as props/params aren't flagged. No autofix.

**Fix**:

1. Extract it into a component in its own `.tsx` file (`renderTextInputIcon` → `TextInputIcon` in `text-input-icon.tsx`) with a named `TextInputIconProps` interface. Pass the values it used to close over as explicit props.
2. Replace `{renderTextInputIcon()}` with `<TextInputIcon {...} />`.
3. Library render props (e.g. FlatList `renderItem`) write the arrow inline in the attribute — `renderItem={({ item }) => <Row item={item} />}` — or use a module-level function. A local `const renderItem = ...` is flagged.

**AVOID**: declaring the new component inside the parent's body, which is worse because it gets a new type every render, remounts, and loses state. Also avoid renaming the helper (e.g. `buildIcon()`) just to escape the `render*` regex.

{% include "includes/line_level_issues.md" %}
