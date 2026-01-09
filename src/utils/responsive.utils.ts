export interface ResponsiveContext {
  isMobile: boolean;
  isTablet: boolean;
}

interface ResponsiveValue<T> {
  mobile: T;
  tablet: T;
  desktop: T;
}

export const getResponsiveValue = <T>(ctx: ResponsiveContext, values: ResponsiveValue<T>): T => {
  if (ctx.isMobile) return values.mobile;
  if (ctx.isTablet) return values.tablet;
  return values.desktop;
};

export const getResultMaxHeight = (ctx: ResponsiveContext): number => {
  return getResponsiveValue(ctx, { mobile: 300, tablet: 400, desktop: 500 });
};

export const getResultMaxHeightPx = (ctx: ResponsiveContext): string => {
  return `${getResultMaxHeight(ctx)}px`;
};

export const getResultRows = (ctx: ResponsiveContext): number => {
  return getResponsiveValue(ctx, { mobile: 8, tablet: 10, desktop: 12 });
};
