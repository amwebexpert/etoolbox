import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const useResponsive = () => {
  const screens = useBreakpoint();

  const isMobile = !!screens.xs && !screens.sm;
  const isTablet = !!(screens.sm || screens.md) && !screens.lg;
  const isDesktop = !!(screens.lg || screens.xl || screens.xxl);
  const shouldCollapseSidebar = !isDesktop;
  const shouldUseDrawer = isMobile;

  return {
    screens,
    isMobile,
    isTablet,
    isDesktop,
    shouldCollapseSidebar,
    shouldUseDrawer,
  };
};
