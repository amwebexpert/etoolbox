import { isBlank } from "@lichens-innovation/ts-common";
import { useEffect, useState } from "react";

export interface ImageDimensions {
  width: number;
  height: number;
}

interface DimensionsResult {
  src: string;
  width: number;
  height: number;
}

export const useImageDimensions = (src: string | null): ImageDimensions | null => {
  const [result, setResult] = useState<DimensionsResult | null>(null);

  useEffect(() => {
    if (isBlank(src)) return;

    let cancelled = false;
    const image = new Image();

    image.onload = (): void => {
      if (cancelled) return;
      setResult({ src, width: image.naturalWidth, height: image.naturalHeight });
    };

    image.onerror = (): void => {
      if (cancelled) return;
      setResult(null);
    };

    image.src = src;

    return (): void => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  if (isBlank(src)) return null;
  if (!result || result.src !== src) return null;
  return { width: result.width, height: result.height };
};
