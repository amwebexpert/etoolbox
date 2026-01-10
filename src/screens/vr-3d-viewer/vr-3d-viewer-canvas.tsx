import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { createStyles } from "antd-style";
import { Suspense, forwardRef, useImperativeHandle, useRef } from "react";

import { useResponsive } from "~/hooks/use-responsive";

import { LoadingIndicator } from "./canvas/loading-indicator";
import { SceneContent } from "./canvas/scene-content";
import type { CameraSettings, ModelFileInfo, SceneSettings } from "./vr-3d-viewer.types";
import { determineCanvasHeight } from "./vr-3d-viewer.utils";

// Types for the component
interface Vr3dViewerCanvasProps {
  modelFile: ModelFileInfo | null;
  sceneSettings: SceneSettings;
  cameraSettings: CameraSettings;
  onProgress: (progress: number) => void;
  onError: (error: string) => void;
  onLoaded: () => void;
}

export interface Vr3dViewerCanvasRef {
  resetCamera: () => void;
  requestFullscreen: () => void;
}

// Main canvas component
export const Vr3dViewerCanvas = forwardRef<Vr3dViewerCanvasRef, Vr3dViewerCanvasProps>(
  ({ modelFile, sceneSettings, cameraSettings, onProgress, onError, onLoaded }, ref) => {
    const { styles } = useStyles();
    const { isMobile, isTablet } = useResponsive();
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<React.ComponentRef<typeof OrbitControls> | null>(null);

    const canvasHeight = determineCanvasHeight({ isMobile, isTablet });

    useImperativeHandle(ref, () => ({
      resetCamera: () => {
        const controls = controlsRef.current;
        if (controls) {
          controls.reset?.();
        }
      },
      requestFullscreen: () => {
        if (containerRef.current) {
          containerRef.current.requestFullscreen?.();
        }
      },
    }));

    return (
      <div ref={containerRef} className={styles.container} style={{ height: canvasHeight }}>
        <Canvas
          camera={{ position: [0, 2, 5], fov: 50 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          className={styles.canvas}
        >
          <Suspense fallback={<LoadingIndicator onProgress={onProgress} />}>
            <SceneContent
              modelFile={modelFile}
              sceneSettings={sceneSettings}
              cameraSettings={cameraSettings}
              onLoaded={onLoaded}
              onError={onError}
              controlsRef={controlsRef}
            />
          </Suspense>
        </Canvas>
      </div>
    );
  }
);

Vr3dViewerCanvas.displayName = "Vr3dViewerCanvas";

const useStyles = createStyles(({ token }) => ({
  container: {
    width: "100%",
    borderRadius: token.borderRadius,
    overflow: "hidden",
    border: `1px solid ${token.colorBorder}`,
    backgroundColor: token.colorBgContainer,
  },
  canvas: {
    width: "100%",
    height: "100%",
  },
}));
