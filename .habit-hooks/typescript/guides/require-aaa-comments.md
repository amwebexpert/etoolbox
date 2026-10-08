In a multi-statement test, the reader has to work out which lines are setup, which line is the behavior under test, and which lines are the verdict. When that boundary is unclear, assertions creep into setup, extra actions sneak in before the `expect`, and the test stops checking one thing. This is a deliberate exception to the non-essential-comment rule: these labels mark structure, not narration.

**What triggers**: an `it`/`test` callback (any chain: `it.only`, `test.each`…) with a block body of 2+ statements, not all `expect(...)`, that lacks a `// act` or `// assert` comment. `// arrange` is optional. Combined labels `// act & assert` (also `and`, `+`, `/`) cover both. Case-insensitive; the comment must start with the label. One-liners, single-statement and expect-only tests are not reported; `describe` is not checked. No autofix.

**Fix**:

1. Group statements into phases, separated by a blank line: setup, the single action under test, then the `expect`s.
2. Put `// arrange` (if there is setup), `// act` and `// assert` above each group.
3. When the action happens inside the assertion (`expect(() => parse(input)).toThrow()`), use `// act & assert`.

**AVOID**: dropping the labels in mechanically without reordering — an `// assert` above a mix of actions and expects, or `// act` on multiple unrelated calls, just hides a test that checks too many things; split it into separate tests instead.

{% include "includes/line_level_issues.md" %}
