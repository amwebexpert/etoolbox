`this.handle.bind(this)` makes the reader stop and work out what `this` would have been without the bind, and why it matters here — a JavaScript quirk leaking into the call site instead of the intent.

**Fix**: use an arrow function, which captures `this` lexically: `items.forEach(() => this.increment())`, or `onClick={() => this.save()}`. For a method passed around repeatedly, declare it as an arrow-function class property (`handleSave = () => { ... }`) so it is always bound.

**AVOID**: replacing `.bind(this)` with `const self = this` — same quirk, just renamed.

{% include "includes/line_level_issues.md" %}
