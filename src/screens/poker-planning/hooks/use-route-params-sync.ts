import { isNotBlank } from "@lichens-innovation/ts-common";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import { usePokerPlanningStore } from "../poker-planning.store";

interface PokerPlanningRouteParams {
  hostName?: string;
  roomUUID?: string;
  roomName?: string;
}

// Populates the store from URL params when the user navigates to a room via a shared link.
export const useRouteParamsSync = () => {
  const routeParams = useParams({ strict: false }) as PokerPlanningRouteParams;
  const { setHostName, setRoomUUID, setRoomName, connect, socketState } = usePokerPlanningStore();

  const paramHostName = routeParams.hostName;
  const paramRoomUUID = routeParams.roomUUID;
  const paramRoomName = routeParams.roomName;

  useEffect(() => {
    if (isNotBlank(paramHostName) && isNotBlank(paramRoomUUID) && isNotBlank(paramRoomName)) {
      setHostName(paramHostName);
      setRoomUUID(paramRoomUUID);
      setRoomName(decodeURIComponent(paramRoomName));
    }
  }, [paramHostName, paramRoomUUID, paramRoomName, setHostName, setRoomName, setRoomUUID]);

  useEffect(() => {
    const isConnected = socketState === "open";
    const isConnecting = socketState === "connecting";

    if (isNotBlank(paramRoomUUID) && isNotBlank(paramHostName) && !isConnected && !isConnecting) {
      connect();
    }
  }, [paramHostName, paramRoomUUID, socketState, connect]);
};
