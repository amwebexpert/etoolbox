This app uses Ant Design. A `<div className="flex items-center gap-2">` re-implements, with utility classes, a layout the design system already provides as `<Flex>` — two ways to express the same thing, and the utility version doesn't follow the antd spacing tokens.

**Fix**: replace the `<div>` with antd `<Flex>`, mapping only the flex classes to props and keeping the result **visually identical**:

| Class       | `<Flex>` prop                                          |
| ----------- | ------------------------------------------------------ |
| `flex`      | _(implicit)_                                           |
| `flex-col`  | `vertical`                                             |
| `flex-wrap` | `wrap`                                                 |
| `gap-*`     | `gap` (in px, e.g. `gap-2` → `8`)                      |
| `items-*`   | `align` (e.g. `items-center` → `"center"`)             |
| `justify-*` | `justify` (e.g. `justify-between` → `"space-between"`) |

Keep every other class (padding, margins, sizing, colors, `flex-1`…) on `className`. Use a numeric `gap` matching the original value rather than `small`/`middle`/`large` when they differ.

**AVOID**: touching `.tsx` files not already modified by the current change, or "rounding" spacing to a nearby antd token — the migration must not change a single pixel.

{% include "includes/line_level_issues.md" %}
