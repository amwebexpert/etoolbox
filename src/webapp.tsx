import { RouterProvider } from "@tanstack/react-router";
import { ConfigProvider, theme } from "antd";

import { TanstackQueryProvider } from "~/providers/react-query-provider";
import { ToastMessageProvider } from "~/providers/toast-message-provider";
import { router } from "~/routes/router";
import { useIsDarkMode } from "~/stores/settings.store";

const PRIMARY_COLOR = "#bf3a2b";
const SECONDARY_COLOR = "#e84b3c";

export const Webapp = () => {
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

  return (
    <ConfigProvider theme={customTheme}>
      <ToastMessageProvider>
        <TanstackQueryProvider>
          <RouterProvider router={router} />
        </TanstackQueryProvider>
      </ToastMessageProvider>
    </ConfigProvider>
  );
};
