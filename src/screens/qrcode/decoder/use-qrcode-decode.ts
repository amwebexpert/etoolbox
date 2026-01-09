import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { useToastMessage } from "~/providers/toast-message-provider";

import { decodeFromFile } from "./qrcode-decoder.utils";

export const useQRCodeDecode = () => {
  const messageApi = useToastMessage();

  const { data, mutate, isPending, isError, error, isSuccess, reset } = useMutation({
    mutationFn: decodeFromFile,
    onSuccess: () => {
      messageApi.success("QR Code decoded successfully!");
    },
  });

  useEffect(() => {
    if (isError && error) {
      messageApi.error(`Decoding failed: ${error.message}`);
    }
  }, [isError, error, messageApi]);

  return {
    decodeResult: data ?? null,
    decode: mutate,
    isDecoding: isPending,
    isDecodeError: isError,
    isDecodeSuccess: isSuccess,
    decodeError: error,
    resetDecode: reset,
  };
};
