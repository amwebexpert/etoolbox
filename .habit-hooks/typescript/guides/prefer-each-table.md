`it.each([["PROGRESS: 42", 42], ...])("reads %s", (line, expected) => ...)` makes the reader count tuple positions to know which value is which, and the test title only gets positional `%s` placeholders.

**Fix**: use the tagged-template table form — named columns, aligned rows, `$name` in the title:
```ts
it.each`
  line              | expected
  ${"PROGRESS: 0"}  | ${0}
  ${"PROGRESS: 42"} | ${42}
`("reads $line", ({ line, expected }) => {
  expect(parseConversionProgress(line)).toBe(expected);
});
```
The autofix handles the unambiguous cases; convert the rest by hand.

**AVOID**: switching to an array of objects just to dodge the rule — the table form is the house style for multi-column cases.

{% include "includes/line_level_issues.md" %}
