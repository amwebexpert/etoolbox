import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FunctionComponent, PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const TanstackQueryProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
