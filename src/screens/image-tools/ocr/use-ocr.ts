import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { useToastMessage } from "~/hooks/use-toast-message";

import { useSetWorkerStatus } from "./ocr.store";
import type { OcrContext, OcrResult, WorkerStatus } from "./ocr.types";
import { getOcrSuccessMessage, processOcr } from "./ocr.utils";

interface UseOcrArgs {
  onProgress?: (status: WorkerStatus) => void;
}

export const useOcr = ({ onProgress }: UseOcrArgs = {}) => {
  const messageApi = useToastMessage();
  const setWorkerStatus = useSetWorkerStatus();

  const handleProgress = (status: WorkerStatus) => {
    setWorkerStatus(status);
    onProgress?.(status);
  };

  const { data, mutate, isPending, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (context: OcrContext): Promise<OcrResult> => processOcr({ context, onProgress: handleProgress }),
    onSuccess: (result) => {
      messageApi.success(getOcrSuccessMessage(result));
    },
  });

  useEffect(() => {
    if (isError && error) {
      messageApi.error(`OCR failed: ${error.message}`);
    }
  }, [isError, error, messageApi]);

  return {
    ocrResult: data ?? null,
    runOcr: mutate,
    isOcrProcessing: isPending,
    isOcrError: isError,
    isOcrSuccess: isSuccess,
    ocrError: error,
    resetOcr: reset,
  };
};
