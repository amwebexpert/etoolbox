`this.onClick.bind(this, 42)` hides what actually gets called and with which arguments: partially applied args are positional and invisible at the call site, and the reader has to know `bind` semantics to see that `42` lands before the event. An arrow function captures `this` lexically and shows the real call, arguments included.

**What triggers**: any `.bind(this, …)` call whose first argument is `this` — `this.handler.bind(this)`, `this.onClick?.bind(this)`, `function () { … }.bind(this)`, and constructor re-binding `this.onClick = this.onClick.bind(this)`. `.bind(otherContext)` / `.bind(null, …)` are not reported. No autofix.

**Fix**:

1. Replace with an arrow that calls the method explicitly: `() => this.increment()`; pass bound args explicitly: `(event) => this.onClick(42, event)`.
2. For a class method used as a callback (constructor re-binding), declare it as an arrow class field instead: `onClick = () => { … }`.
3. If the listener must be removed later, store the arrow in a field and pass the same reference to `add`/`removeEventListener`.

**AVOID**: aliasing `const self = this` and passing `self.method.bind(self)` or `fn.call(this, …)` wrappers — they dodge the `this` match while keeping the same indirection.

{% include "includes/line_level_issues.md" %}
