import type { OrbitControls } from "@react-three/drei";

import type { CameraSettings, LightingPreset, ModelFileInfo, SceneSettings } from "../vr-3d-viewer.types";

// Props for individual model loader components
export interface ModelComponentProps {
  url: string;
  scale: number;
  onLoaded: () => void;
}

// Props for OBJ model with optional material
export interface ObjModelProps extends ModelComponentProps {
  materialUrl?: string;
}

// Props for the main model loader
export interface ModelLoaderProps {
  modelFile: ModelFileInfo;
  scale: number;
  onLoaded: () => void;
  onError: (error: string) => void;
}

// Props for camera controller
export interface CameraControllerProps {
  settings: CameraSettings;
  controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>;
}

// Props for scene content
export interface SceneContentProps {
  modelFile: ModelFileInfo | null;
  sceneSettings: SceneSettings;
  cameraSettings: CameraSettings;
  onLoaded: () => void;
  onError: (error: string) => void;
  controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>;
}

// Props for scene grid
export interface SceneGridProps {
  backgroundColor: string;
}

// Props for loading indicator
export interface LoadingIndicatorProps {
  onProgress: (progress: number) => void;
}

/**
 * Get environment preset based on lighting setting
 */
export const getEnvironmentPreset = (preset: LightingPreset): "studio" | "sunset" | "dawn" | "city" => {
  switch (preset) {
    case "studio":
      return "studio";
    case "outdoor":
      return "sunset";
    case "dramatic":
      return "dawn";
    case "soft":
      return "city";
    default:
      return "studio";
  }
};
