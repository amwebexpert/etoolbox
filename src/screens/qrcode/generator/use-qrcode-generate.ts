import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { useToastMessage } from "~/providers/toast-message-provider";

import { generateQRCode } from "./qrcode-generator.utils";

export const useQRCodeGenerate = () => {
  const messageApi = useToastMessage();

  const { data, mutate, isPending, isError, error, isSuccess, reset } = useMutation({
    mutationFn: generateQRCode,
    onSuccess: () => {
      messageApi.success("QR Code generated successfully!");
    },
  });

  useEffect(() => {
    if (isError && error) {
      messageApi.error(`Generation failed: ${error.message}`);
    }
  }, [isError, error, messageApi]);

  return {
    qrCodeDataUrl: data ?? "",
    generate: mutate,
    isGenerating: isPending,
    isGenerateError: isError,
    isGenerateSuccess: isSuccess,
    generateError: error,
    resetGenerate: reset,
  };
};
