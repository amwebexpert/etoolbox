import { isBlank } from "@lichens-innovation/ts-common";
import { useQuery } from "@tanstack/react-query";

import { PokerPlanningQueryKey } from "../poker-planning.constants";
import { usePokerPlanningStore } from "../poker-planning.store";
import { buildFullRouteURL, generateQRCodeDataUrl } from "../poker-planning.utils";

export const useRoomQRCode = () => {
  const { hostName, roomName, roomUUID } = usePokerPlanningStore();

  const isSessionActive = !isBlank(roomUUID);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: PokerPlanningQueryKey.qrcode(hostName, roomUUID, roomName),
    queryFn: async () => {
      const url = buildFullRouteURL({ hostName, roomUUID, roomName });
      return generateQRCodeDataUrl({ data: url, width: 200 });
    },
    enabled: isSessionActive,
    staleTime: Infinity, // QR code doesn't need to be refetched if params haven't changed
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });

  return {
    qrCodeDataUrl: data ?? null,
    isLoading: isLoading && isSessionActive,
    isError,
    error: error as Error | null,
    isSessionActive,
  };
};
