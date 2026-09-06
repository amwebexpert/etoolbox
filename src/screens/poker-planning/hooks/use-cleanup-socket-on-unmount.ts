import { useEffect } from "react";

import { useClearSocket } from "../poker-planning.store";

export const useCleanupSocketOnUnmount = () => {
  const clearSocket = useClearSocket();

  useEffect(() => {
    return clearSocket;
  }, [clearSocket]);
};
