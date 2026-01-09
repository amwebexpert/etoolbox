import { useProgress } from "@react-three/drei";
import { useEffect, useRef, startTransition } from "react";

import type { LoadingIndicatorProps } from "./canvas.types";

/**
 * Loading indicator component that tracks Three.js loading progress
 * Uses subscription pattern to avoid "Cannot update component while rendering" error
 */
export const LoadingIndicator = ({ onProgress }: LoadingIndicatorProps) => {
  const onProgressRef = useRef(onProgress);

  // Keep ref updated with latest callback
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    // Subscribe to progress changes using the zustand store API
    // This avoids reactive re-renders that can conflict with Three.js loader render cycles
    const unsubscribe = useProgress.subscribe((state) => {
      // Use startTransition to mark this as a non-urgent update
      // This prevents "Cannot update component while rendering" errors
      startTransition(() => {
        onProgressRef.current(state.progress);
      });
    });

    // Get initial progress
    const initialProgress = useProgress.getState().progress;
    startTransition(() => {
      onProgressRef.current(initialProgress);
    });

    return unsubscribe;
  }, []);

  return null;
};
