import { useDebounce } from "@uidotdev/usehooks";
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import type { CompressorStoreState } from "./compressor.store";
import { useCompressorStore } from "./compressor.store";
import type { CompressorSettings } from "./compressor.types";
import { buildCompressorOptions, compressImage } from "./compressor.utils";

const COMPRESSION_DEBOUNCE_MS = 500;

export interface UseCompressorReturn {
  compressedBlob: Blob | null;
  compressedObjectUrl: string | null;
  isCompressing: boolean;
  compressionError: Error | null;
  reset: () => void;
}

const selectSettings = (state: CompressorStoreState): CompressorSettings => ({
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

const toError = (value: unknown): Error => (value instanceof Error ? value : new Error(String(value)));

export const useCompressor = (file: File | null): UseCompressorReturn => {
  const settings = useCompressorStore(useShallow(selectSettings));

  const debouncedFile = useDebounce(file, COMPRESSION_DEBOUNCE_MS);
  const debouncedSettings = useDebounce(settings, COMPRESSION_DEBOUNCE_MS);

  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedObjectUrl, setCompressedObjectUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionError, setCompressionError] = useState<Error | null>(null);

  useEffect(() => {
    if (!debouncedFile) {
      setIsCompressing(false);
      return;
    }

    let cancelled = false;
    setIsCompressing(true);
    setCompressionError(null);

    compressImage(debouncedFile, buildCompressorOptions(debouncedSettings))
      .then((result) => {
        if (cancelled) return;
        setCompressedBlob(result);
        setIsCompressing(false);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setCompressionError(toError(error));
        setIsCompressing(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedFile, debouncedSettings]);

  useEffect(() => {
    if (!compressedBlob) {
      setCompressedObjectUrl(null);
      return;
    }

    const url = URL.createObjectURL(compressedBlob);
    setCompressedObjectUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [compressedBlob]);

  const reset = useCallback((): void => {
    setCompressedBlob(null);
    setCompressionError(null);
    setIsCompressing(false);
  }, []);

  return { compressedBlob, compressedObjectUrl, isCompressing, compressionError, reset };
};
