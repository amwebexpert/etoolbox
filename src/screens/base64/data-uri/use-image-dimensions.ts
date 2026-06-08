import { useEffect, useState } from "react";

export type ImageDimensionsStatus = "idle" | "loading" | "loaded" | "error";

export interface ImageDimensionsState {
  status: ImageDimensionsStatus;
  width: number | null;
  height: number | null;
}

const IDLE_STATE: ImageDimensionsState = { status: "idle", width: null, height: null };
const LOADING_STATE: ImageDimensionsState = { status: "loading", width: null, height: null };

interface LoadResult {
  src: string;
  width: number | null;
  height: number | null;
  hasError: boolean;
}

export const useImageDimensions = (src: string | null): ImageDimensionsState => {
  const [result, setResult] = useState<LoadResult | null>(null);

  useEffect(() => {
    if (!src) return;

    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (cancelled) return;
      setResult({ src, width: img.naturalWidth, height: img.naturalHeight, hasError: false });
    };

    img.onerror = () => {
      if (cancelled) return;
      setResult({ src, width: null, height: null, hasError: true });
    };

    img.src = src;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (!src) return IDLE_STATE;
  if (!result || result.src !== src) return LOADING_STATE;
  if (result.hasError) return { status: "error", width: null, height: null };
  return { status: "loaded", width: result.width, height: result.height };
};
