import { ZustandDevToolsPanel } from "@sucoza/zustand-devtools-plugin";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
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

          <TanStackDevtools
            config={{ position: "bottom-right", triggerMode: "fixed" }}
            plugins={[
              { name: "TanStack Query", render: <ReactQueryDevtoolsPanel /> },
              { name: "TanStack Router", render: <TanStackRouterDevtoolsPanel router={router} /> },
              { name: "Zustand Stores", render: <ZustandDevToolsPanel /> },
            ]}
          />
        </TanstackQueryProvider>
      </ToastMessageProvider>
    </ConfigProvider>
  );
};
