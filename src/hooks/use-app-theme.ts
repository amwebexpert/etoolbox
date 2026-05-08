import { theme } from "antd";
import { useEffect } from "react";

import { useColorTheme, useIsDarkMode } from "~/stores/settings.store";
import { THEMES } from "~/themes";

export const useAppTheme = () => {
  const isDarkMode = useIsDarkMode();
  const colorTheme = useColorTheme();
  const { primary, secondary } = THEMES[colorTheme];

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primary);
  }, [primary]);

  const customTheme = {
    token: {
      colorPrimary: primary,
      colorLink: secondary,
      borderRadius: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return customTheme;
};
