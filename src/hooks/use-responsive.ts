import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const useResponsive = () => {
  const screens = useBreakpoint();

  const isMobile = !!screens.xs && !screens.sm;
  const isTablet = (Boolean(screens.sm) || Boolean(screens.md)) && !screens.lg;
  const isDesktop = Boolean(screens.lg) || Boolean(screens.xl) || Boolean(screens.xxl);
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
