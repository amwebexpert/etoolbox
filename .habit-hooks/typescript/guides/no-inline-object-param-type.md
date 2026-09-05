`({ a, b }: { a: string; b: number }) => ...` defines a shape that has no name — anyone who wants to build a value of that shape, reuse it in another signature, or just understand what the parameter represents has nothing to reference; they have to go read this one function's signature and copy it by hand.

**Fix**: extract a named `interface` right above the function, matching the house style — capitalize the function name, add an `Args`/`Props` suffix as appropriate:
```ts
interface BuildFooKeyArgs {
  siteSlug?: string;
  equipmentSlug?: string;
}

const buildFooKey = ({ siteSlug, equipmentSlug }: BuildFooKeyArgs) => { ... };
```

**Known, deliberate exception**: a parameter shape genuinely imposed by an external library's callback signature (e.g. a snake_case event object from a third-party component) still deserves a named local interface — extract it too, even though you didn't design the shape; it still gives the parameter a name a reader can look up.

**AVOID**: naming the extracted interface something generic (`Args`, `Params`, `Props` with no prefix) when multiple functions in the same file would each want their own — collisions force an awkward rename later.

{% include "includes/line_level_issues.md" %}
