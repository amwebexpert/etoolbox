`buildKey(siteSlug, equipmentSlug)` reads fine where it is declared, but at the call site `buildKey(a, b)` gives no hint which argument is which — swap two strings and nothing complains. Every extra positional parameter is another chance for a silent mix-up, and adding a new one later means touching every caller's argument order.

**What triggers**: any project-owned function (declaration, expression, arrow, method) with more parameters than `max` (default `1`; option: a number or `{ max }`). A TS `this` parameter and a `...rest` parameter each count as one. Exempt: callbacks passed as call/`new` arguments (also through object/array/ternary/`??`/`as`/`satisfies`/`!` wrappers), JSX attribute callbacks, a `const` arrow/function expression that is passed by reference to a call somewhere in scope (not `function` declarations), functions whose expected (contextual) type comes from `node_modules` / TS lib, and class methods overriding a method of an externally declared base class. No autofix.

**Fix**:

1. Declare a named `interface` above the function, named after it in PascalCase + `Args` — `buildKey` → `interface BuildKeyArgs { siteSlug: string; equipmentSlug: string }`.
2. Take a single destructured parameter of that type: `const buildKey = ({ siteSlug, equipmentSlug }: BuildKeyArgs) => ...`.
3. Update every call site to pass named fields: `buildKey({ siteSlug, equipmentSlug })`.

**AVOID**:

- Leaving the shape inline (`({ a, b }: { a: string; b: number })`) — that trips `no-inline-object-param-type`; the interface must be named.
- Collapsing params into `...args: [string, number]` or a tuple — still positional, just hidden.
- Currying (`(a) => (b) => ...`) or a generic `Args`/`Params` interface name shared by several functions in the file.
- Typing the function with a library type or routing it through a dummy call just to hit an exemption.

{% include "includes/line_level_issues.md" %}
