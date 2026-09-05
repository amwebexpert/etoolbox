import { isBlank } from "@lichens-innovation/ts-common";
import { useEffect } from "react";

import { usePokerPlanningStore } from "../poker-planning.store";
import { parseEstimates } from "../poker-planning.utils";

export const useSessionSync = () => {
  const { session, username, setMyEstimate, setIsEstimatesVisible } = usePokerPlanningStore();

  const estimates = session?.estimates ?? [];
  const { isEstimatesCleared } = parseEstimates({ estimates, username });

  useEffect(() => {
    if (!session || isBlank(username)) return;

    const mySessionEstimate = session.estimates.find((e) => e.username === username);
    if (mySessionEstimate) {
      setMyEstimate(mySessionEstimate.estimate);
    }
  }, [session, username, setMyEstimate]);

  useEffect(() => {
    if (isEstimatesCleared) {
      setIsEstimatesVisible(false);
      setMyEstimate(undefined);
    }
  }, [isEstimatesCleared, setIsEstimatesVisible, setMyEstimate]);
};
