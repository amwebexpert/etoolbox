import { useProgress } from "@react-three/drei";
import { startTransition, useEffect, useRef } from "react";

import type { LoadingIndicatorProps } from "./canvas.types";

// Uses subscription pattern to avoid "Cannot update component while rendering" error
export const LoadingIndicator = ({ onProgress }: LoadingIndicatorProps) => {
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    // This avoids reactive re-renders that can conflict with Three.js loader render cycles
    const unsubscribe = useProgress.subscribe((state) => {
      // This prevents "Cannot update component while rendering" errors
      startTransition(() => {
        onProgressRef.current(state.progress);
      });
    });

    const initialProgress = useProgress.getState().progress;
    startTransition(() => {
      onProgressRef.current(initialProgress);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};
