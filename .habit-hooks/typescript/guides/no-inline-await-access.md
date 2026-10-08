`(await getUser(id)).name` packs two steps — waiting for a result and operating on it — into one parenthesized expression. The intermediate value has no name, can't be inspected in a debugger or log line, and a nested `await (await fetch(url)).json()` reads inside-out.

**What triggers**: `(await x)` used directly as the object of a member access or as a callee: `(await x).prop`, `(await x)?.prop`, `(await x)[0]`, `(await x).method()`, `(await x)()`. Type wrappers (`as`, `!`, `satisfies`) around the `await` are seen through. `(await x) ?? fallback` and plain `await x` are not reported. No autofix.

**Fix**:

1. Await on its own line into a named variable describing the result: `const user = await getUser(id);`
2. Operate on that variable on the next line: `const name = user.name;`
3. For chained awaits, one variable per step: `const response = await fetch(url);` then `const data = await response.json();`

**AVOID**: hiding the chain in `.then((user) => user.name)` or a one-off wrapper like `getUserName = async (id) => (await getUser(id)).name` — the unnamed intermediate step is still there.

{% include "includes/line_level_issues.md" %}
