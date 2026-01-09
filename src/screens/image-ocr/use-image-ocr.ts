import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { useToastMessage } from "~/providers/toast-message-provider";

import { useImageOcrStore } from "./image-ocr.store";
import { processOcr } from "./image-ocr.utils";
import type { OcrContext, OcrResult, WorkerStatus } from "./image-ocr.utils";

interface UseImageOcrArgs {
  onProgress?: (status: WorkerStatus) => void;
}

export const useImageOcr = ({ onProgress }: UseImageOcrArgs = {}) => {
  const messageApi = useToastMessage();
  const setWorkerStatus = useImageOcrStore((state) => state.setWorkerStatus);

  const handleProgress = (status: WorkerStatus) => {
    setWorkerStatus(status);
    onProgress?.(status);
  };

  const mutationFn = async (context: OcrContext): Promise<OcrResult> => {
    return processOcr({
      context,
      onProgress: handleProgress,
    });
  };

  const { data, mutate, isPending, isError, error, isSuccess, reset } = useMutation({
    mutationFn,
    onSuccess: (result) => {
      messageApi.success(`Text extracted successfully! Found ${result.wordCount} words in ${result.processingTime}ms`);
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
    isProcessing: isPending,
    isOcrError: isError,
    isOcrSuccess: isSuccess,
    ocrError: error,
    resetOcr: reset,
  };
};
