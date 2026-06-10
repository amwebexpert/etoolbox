import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { useToastMessage } from "~/hooks/use-toast-message";

import type { CompressorStoreState } from "./compressor.store";
import type { CompressorSettings } from "./compressor.types";
import { buildCompressorOptions, compressImage } from "./compressor.utils";

export interface CompressInput {
  file: File;
  settings: CompressorSettings;
}

export interface UseCompressorReturn {
  compressedBlob: Blob | null;
  compressedObjectUrl: string | null;
  isCompressing: boolean;
  compressionError: Error | null;
  compress: (input: CompressInput) => void;
  resetCompress: () => void;
}

export const selectCompressorSettings = (state: CompressorStoreState): CompressorSettings => ({
  quality: state.quality,
  mimeType: state.mimeType,
  maxWidth: state.maxWidth,
  maxHeight: state.maxHeight,
  minWidth: state.minWidth,
  minHeight: state.minHeight,
  width: state.width,
  height: state.height,
  resize: state.resize,
  convertSize: state.convertSize,
  checkOrientation: state.checkOrientation,
});

const compressWithSettings = async ({ file, settings }: CompressInput): Promise<Blob> => {
  const result = await compressImage({ file, options: buildCompressorOptions(settings) });
  return result;
};

export const useCompressor = (): UseCompressorReturn => {
  const messageApi = useToastMessage();

  const { data, mutate, isPending, error, reset } = useMutation({
    mutationFn: compressWithSettings,
    onSuccess: () => {
      messageApi.success("Image compressed successfully!");
    },
  });

  useEffect(() => {
    if (error) {
      messageApi.error(`Compression failed: ${error.message}`);
    }
  }, [error, messageApi]);

  const compressedBlob = data ?? null;
  const compressedObjectUrl = compressedBlob ? URL.createObjectURL(compressedBlob) : null;

  return {
    compressedBlob,
    compressedObjectUrl,
    isCompressing: isPending,
    compressionError: error,
    compress: mutate,
    resetCompress: reset,
  };
};
