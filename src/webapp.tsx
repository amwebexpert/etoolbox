import { RouterProvider } from "@tanstack/react-router";
import { ConfigProvider } from "antd";

import { useAppTheme } from "~/hooks/use-app-theme";
import { TanstackQueryProvider } from "~/providers/react-query-provider";
import { ToastMessageProvider } from "~/providers/toast-message-provider";
import { router } from "~/routes/router";

export const Webapp = () => {
  const customTheme = useAppTheme();

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
