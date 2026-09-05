export interface ResponsiveContext {
  isMobile: boolean;
  isTablet: boolean;
}

/** Ant Design `size`: `"small"` on mobile, `undefined` otherwise (default size, no forced `"middle"` / `"medium"`). habit-hooks-disable non-essential-comment */
export const smallSizeOnMobile = (isMobile: boolean): "small" | undefined => (isMobile ? "small" : undefined);

interface ResponsiveValue<T> {
  mobile: T;
  tablet: T;
  desktop: T;
}

interface GetResponsiveValueArgs<T> {
  ctx: ResponsiveContext;
  values: ResponsiveValue<T>;
}

const getResponsiveValue = <T>({ ctx, values }: GetResponsiveValueArgs<T>): T => {
  if (ctx.isMobile) return values.mobile;
  if (ctx.isTablet) return values.tablet;
  return values.desktop;
};

export const getResultMaxHeight = (ctx: ResponsiveContext): number => {
  return getResponsiveValue({ ctx, values: { mobile: 300, tablet: 400, desktop: 500 } });
};

export const getResultMaxHeightPx = (ctx: ResponsiveContext): string => {
  return `${getResultMaxHeight(ctx)}px`;
};

export const getResultRows = (ctx: ResponsiveContext): number => {
  return getResponsiveValue({ ctx, values: { mobile: 8, tablet: 10, desktop: 12 } });
};
