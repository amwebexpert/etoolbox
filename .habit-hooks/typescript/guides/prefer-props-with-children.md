Hand-adding `children: ReactNode` to a props interface duplicates a pattern React's own types already name — every component that accepts children needs the exact same field, spelled the same way, and `PropsWithChildren` exists specifically so nobody has to retype it.

**Fix**: remove the `children` field from the interface and wrap the props type at the point of use instead — `FunctionComponent<PropsWithChildren<FooProps>>`. If `children` was the *only* field, drop the interface entirely and use `FunctionComponent<PropsWithChildren>` (its default generic already covers "no other props").

**AVOID**: making `children` optional by hand (`children?: ReactNode`) to match `PropsWithChildren`'s optionality — just use `PropsWithChildren`, which already declares `children` as optional; there's no need to hand-replicate that either.

{% include "includes/line_level_issues.md" %}
