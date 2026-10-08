`getByTestId("submit")` only proves an element with that attribute exists — it says nothing about whether a real user could actually find and use it. A button with no accessible name still passes a `getByTestId` assertion; the same test written with `getByRole` would fail, because it queries the page the way assistive technology and sighted users both actually navigate it.

**What triggers**: any `getByTestId`/`queryByTestId`/`findByTestId` call (and their `All` variants), bare or as a method (`screen.getByTestId`). No autofix.

**Fix**: keep the same `get`/`query`/`find`(`All`) prefix and fall back in this order:

1. `getByRole("button", { name: "Submit" })` — interactive or semantic elements.
2. `getByLabelText("Email")` — form fields with a label.
3. `getByText("No results")` — non-interactive content.
   If none of these can find it, the element probably lacks an accessible name or semantic markup — fix the markup (semantic element, `aria-label`) rather than keeping the test id.

**AVOID**: adding a `data-testid` _and_ an accessible role/name side by side "just to be safe" — pick the query that proves the component is actually usable.

{% include "includes/line_level_issues.md" %}
