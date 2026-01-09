import { Outlet } from "@tanstack/react-router";
import { AppLayout } from "~/components/layout/app-layout";

export const RootLayout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
