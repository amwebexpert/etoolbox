In an Ant Design app, `<div className="flex items-center gap-2">` bypasses the design system's own layout primitive: spacing, direction and alignment are expressed as typed `<Flex>` props, while a hand-rolled flex `div` drifts from them and from every other layout in the app.

**What triggers**: a `<div>` in a `.tsx` file whose `className` contains the `flex` token (string, template literal, `clsx`/`cn` args, ternary/`&&` branches), when the file imports `antd` or the nearest `package.json` declares `antd`. Not reported: `inline-flex`, responsive `md:flex`, other elements (`<span>`), CSS-module `styles.flex`. No autofix.

**Fix**:

1. Replace `<div>` with `<Flex>` imported from `antd`.
2. Map flex classes to props: `flex-col`→`vertical`, `flex-wrap`→`wrap`, `items-*`→`align` (`items-center`→`"center"`), `justify-*`→`justify` (`justify-between`→`"space-between"`), `gap-*`→numeric `gap` in px (`gap-2`→`{8}`); drop `flex` itself.
3. Keep every other class (padding, margin, sizing, colors, `flex-1`) on `className`. The rendered result must be visually identical.

**AVOID**: switching to `<span>` / another tag, moving `flex` into a CSS module or `style={{ display: "flex" }}`, or using `gap="small"` when the original spacing differs — all silence the rule while keeping (or changing) the layout.

{% include "includes/line_level_issues.md" %}
