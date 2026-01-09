import { OrbitControls } from "@react-three/drei";

import type { CameraControllerProps } from "./canvas.types";

/**
 * Camera controller with orbit controls and reset functionality
 */
export const CameraController = ({ settings, controlsRef }: CameraControllerProps) => {
  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate={settings.autoRotate}
      autoRotateSpeed={settings.autoRotateSpeed}
      enableZoom={settings.enableZoom}
      enablePan={settings.enablePan}
      minDistance={settings.minDistance}
      maxDistance={settings.maxDistance}
      enableDamping
      dampingFactor={0.05}
    />
  );
};
