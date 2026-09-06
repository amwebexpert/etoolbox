Mixing `function foo() {}` declarations with `const foo = () => {}` expressions for the same kind of module-scoped logic means a reader has to track two different binding/hoisting behaviours (declarations hoist fully, `const` doesn't) for no functional benefit at this call site.

**Fix:** convert the declaration to a `const` arrow — `const foo = (...) => { ... }`. Watch for one thing the conversion can break: if the function is *called before its own declaration line* in the same module (relying on hoisting), either move the `const` above its first use, or confirm the use is inside a callback that only runs later (closures capture by reference, so a call deferred until after the whole module finished evaluating is safe either way).

**Exempt by construction**: generator functions (`function* foo()`) can't be written as arrows — the rule already skips them.

**AVOID**: converting a function that's genuinely called before its declaration in synchronous top-level code without checking — that turns a working hoisted call into a runtime `ReferenceError`. Trace every call site first.

{% include "includes/line_level_issues.md" %}
