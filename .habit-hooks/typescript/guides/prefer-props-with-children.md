Hand-adding `children: ReactNode` to a props interface duplicates a pattern React's own types already name — every component that accepts children needs the exact same field, spelled the same way, and `PropsWithChildren` exists specifically so nobody has to retype it.

**What triggers**: any `interface` that declares a `children` member, whatever its type or optionality. No autofix.

**Fix**:

1. Remove `children` from the interface and wrap the props type at the point of use — `FunctionComponent<PropsWithChildren<FooProps>>` (or `({ title, children }: PropsWithChildren<FooProps>)`).
2. `children` was the only field? Drop the interface and use `FunctionComponent<PropsWithChildren>`.
3. `children` is a render function (`children: (state: State) => ReactNode`)? `PropsWithChildren` doesn't fit — rename the prop to say what it is (`renderContent: (state: State) => ReactNode`) and pass it explicitly.

**AVOID**: hand-writing `children?: ReactNode` to mimic `PropsWithChildren`'s optionality, or switching to a `type` alias just to escape the rule.

{% include "includes/line_level_issues.md" %}
