`(await getUser(id)).name` or `await (await fetch(url)).json()` packs two steps — waiting for a value, then using it — into one line behind a pair of parentheses. The intermediate value has no name, so a reader (and a debugger breakpoint) can't see what came back.

**Fix**: await on its own line into a named variable, then operate on it:
```ts
const response = await fetch(url);
const data = await response.json();

const user = await getUser(id);
const name = user.name;
```

**AVOID**: generic names like `result` / `res` / `tmp` for the extracted variable — name it after what the promise resolves to (`response`, `user`, `rawEntries`).

{% include "includes/line_level_issues.md" %}
