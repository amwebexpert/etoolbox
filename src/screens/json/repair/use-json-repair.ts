import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { useToastMessage } from "~/providers/toast-message-provider";

import { repairJson } from "./json-repair.utils";

export const useJsonRepair = () => {
  const messageApi = useToastMessage();

  const { data, mutate, isPending, isError, error, isSuccess, reset } = useMutation({
    mutationFn: async (input: string) => repairJson(input),
    onSuccess: () => {
      messageApi.success("JSON repaired successfully!");
    },
  });

  useEffect(() => {
    if (isError && error) {
      messageApi.error(`Repair failed: ${error.message}`);
    }
  }, [isError, error, messageApi]);

  return {
    repairedJson: data ?? "",
    repair: mutate,
    isRepairing: isPending,
    isRepairError: isError,
    isRepairSuccess: isSuccess,
    repairError: error,
    resetRepair: reset,
  };
};
