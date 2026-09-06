`dangerouslySetInnerHTML` injects a string straight into the DOM as HTML, bypassing React's normal escaping. If any part of that string can trace back to user input, another user's content, or an API response that isn't fully trusted, this is a stored/reflected XSS vector — the name is not an exaggeration.

**Fix:**
1. First choice: don't render raw HTML at all — render the data as React children/text, or parse it into structured props and render normal JSX.
2. Genuinely need to render rich HTML (a CMS field, markdown-to-HTML output): sanitize it first with `DOMPurify.sanitize(html)` immediately before setting it, every time, at the point of render — not "sanitized once upstream, trust it downstream".

**AVOID**: sanitizing once at the API boundary and assuming it stays safe through every later transformation — sanitize at the point where it's actually injected into the DOM, since that's the property that matters.

{% include "includes/line_level_issues.md" %}
