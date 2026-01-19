import { theme } from "antd";

import { useIsDarkMode } from "~/stores/settings.store";

const PRIMARY_COLOR = "#bf3a2b";
const SECONDARY_COLOR = "#e84b3c";

export const useAppTheme = () => {
  const isDarkMode = useIsDarkMode();

  const customTheme = {
    token: {
      colorPrimary: PRIMARY_COLOR,
      colorLink: SECONDARY_COLOR,
      borderRadius: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return customTheme;
};
