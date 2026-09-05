`eval(str)` and `new Function(str)(...)` both compile and run an arbitrary string as code, with the full privileges of the running page. If any part of that string can be influenced by user input, a URL param, or an API response, this is a direct code-execution vulnerability — not a hypothetical one, an XSS-class bug. Even with no attacker in the picture, both defeat static analysis and bundler tooling, and are dramatically slower than a real function call.

**Fix — there is always a non-`eval` way to do what this was for:**
1. Dynamic property/behaviour lookup by a known set of keys → a lookup map/object (`const handlers = { foo: fooFn, bar: barFn }; handlers[key]?.()`).
2. Parsing data → `JSON.parse` (inside a `try/catch`), not `eval`.
3. Dynamically importing a module by name → `await import(specifier)`.

**AVOID**: `new Function(...)` as a "safer-looking" substitute for `eval` — it is not; it has the same code-injection surface.

{% include "includes/line_level_issues.md" %}
