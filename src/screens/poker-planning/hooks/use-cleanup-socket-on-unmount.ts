import { useEffect } from "react";

import { useClearSocket } from "../poker-planning.store";

/**
 * Hook to cleanup the socket connection when the component unmounts.
 */
export const useCleanupSocketOnUnmount = () => {
  const clearSocket = useClearSocket();

  useEffect(() => {
    // return the unmount callback
    return clearSocket;
  }, [clearSocket]);
};
