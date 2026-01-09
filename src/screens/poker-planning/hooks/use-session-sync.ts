import { isBlank } from "@lichens-innovation/ts-common";
import { useEffect } from "react";

import { usePokerPlanningStore } from "../poker-planning.store";
import { parseEstimates } from "../poker-planning.utils";

/**
 * Hook to synchronize session state with the store.
 * Handles syncing the user's estimate with the server session
 * and clearing estimates when the session is reset.
 */
export const useSessionSync = () => {
  const { session, username, setMyEstimate, setIsEstimatesVisible } = usePokerPlanningStore();

  const estimates = session?.estimates ?? [];
  const { isEstimatesCleared } = parseEstimates({ estimates, username });

  // Sync my estimate with server session
  useEffect(() => {
    if (!session || isBlank(username)) return;

    const mySessionEstimate = session.estimates.find((e) => e.username === username);
    if (mySessionEstimate) {
      setMyEstimate(mySessionEstimate.estimate);
    }
  }, [session, username, setMyEstimate]);

  // Handle estimates cleared event
  useEffect(() => {
    if (isEstimatesCleared) {
      setIsEstimatesVisible(false);
      setMyEstimate(undefined);
    }
  }, [isEstimatesCleared, setIsEstimatesVisible, setMyEstimate]);
};
