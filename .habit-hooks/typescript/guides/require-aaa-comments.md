A multi-statement test with no phase markers makes the reader work out where the setup ends, which line is actually under test, and where the checks start.

**Fix**: label the phases with lowercase line comments:
- `// arrange` — setup (optional; omit when there is none)
- `// act` — the call under test
- `// assert` — the `expect`s
- `// act & assert` — when they are one statement, e.g. `expect(() => parse(input)).toThrow()`

One-liner tests and tests made only of `expect(...)` statements are not reported.

This is a deliberate exception to the no-needless-comment guideline (the `allow-aaa` transformer keeps these markers out of `non-essential-comment`).

**AVOID**: dropping all three markers at the top of the test, or labelling a line `// act` when it is setup — the markers must sit right above the statements they describe.

{% include "includes/line_level_issues.md" %}
