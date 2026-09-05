Accessing `props.foo` throughout a component body hides the component's actual dependencies inside the function — a reader has to scan every line to find every field it touches, instead of reading them off the signature in one place.

**Fix:**
1. Destructure in the function signature: `({ foo, bar }: Props) => { ... }`.
2. Still need the whole object to forward it somewhere (e.g. `onAction={() => doThing(props)}`)? Keep the `props` parameter *and* destructure the specific fields you read directly: `const { foo } = props;` alongside passing `props` through unchanged elsewhere. Destructuring doesn't forbid also holding onto the whole object.

**AVOID**: destructuring a field only to immediately re-read `props.thatField` somewhere else in the same component out of habit — once destructured, use the local binding everywhere in scope.

{% include "includes/line_level_issues.md" %}
