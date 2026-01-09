import { Environment } from "@react-three/drei";

import { CameraController } from "./camera-controller";
import { getEnvironmentPreset, type SceneContentProps } from "./canvas.types";
import { ModelLoader } from "./model-loader";
import { computeBackgroundColor } from "./scene-content.utils";
import { SceneGrid } from "./scene-grid";

/**
 * Main scene content component that assembles all 3D elements
 */
export const SceneContent = ({
  modelFile,
  sceneSettings,
  cameraSettings,
  onLoaded,
  onError,
  controlsRef,
}: SceneContentProps) => {
  const backgroundColor = computeBackgroundColor(sceneSettings.backgroundColor);

  return (
    <>
      <color attach="background" args={[backgroundColor.r, backgroundColor.g, backgroundColor.b]} />
      <ambientLight intensity={sceneSettings.ambientIntensity} />
      <Environment preset={getEnvironmentPreset(sceneSettings.lightingPreset)} />
      <CameraController settings={cameraSettings} controlsRef={controlsRef} />

      {sceneSettings.showGrid && <SceneGrid backgroundColor={sceneSettings.backgroundColor} />}
      {sceneSettings.showAxes && <axesHelper args={[5]} />}

      {modelFile && (
        <ModelLoader modelFile={modelFile} scale={sceneSettings.modelScale} onLoaded={onLoaded} onError={onError} />
      )}
    </>
  );
};
