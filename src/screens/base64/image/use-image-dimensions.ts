import { useEffect, useState } from "react";

export type ImageDimensionsStatus = "idle" | "loading" | "loaded" | "error";

export interface ImageDimensionsState {
  status: ImageDimensionsStatus;
  width: number | null;
  height: number | null;
}

const IDLE_STATE: ImageDimensionsState = { status: "idle", width: null, height: null };

export const useImageDimensions = (src: string | null): ImageDimensionsState => {
  const [state, setState] = useState<ImageDimensionsState>(IDLE_STATE);

  useEffect(() => {
    if (!src) {
      setState(IDLE_STATE);
      return;
    }

    setState({ status: "loading", width: null, height: null });

    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (cancelled) return;
      setState({ status: "loaded", width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = () => {
      if (cancelled) return;
      setState({ status: "error", width: null, height: null });
    };

    img.src = src;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return state;
};
