`getByTestId("submit")` only proves an element with that attribute exists — it says nothing about whether a real user could actually find and use it. A button with no accessible name still passes a `getByTestId` assertion; the same test written with `getByRole` would fail, because it queries the page the way assistive technology and sighted users both actually navigate it.

**Fix**: query by role and accessible name — `getByRole("button", { name: "Submit" })`. If the element doesn't have an obvious role or accessible name yet, that's usually the real bug the test just surfaced — fix the markup (add an `aria-label`, use a semantic element) rather than falling back to a test-only attribute.

**AVOID**: adding a `data-testid` *and* an accessible role/name side by side "just to be safe" — pick the query that proves the component is actually usable; a redundant `data-testid` doesn't add coverage.

{% include "includes/line_level_issues.md" %}
