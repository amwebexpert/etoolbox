import type { OrbitControls } from "@react-three/drei";

import type { CameraSettings, LightingPreset, ModelFileInfo, SceneSettings } from "../vr-3d-viewer.types";

export interface ModelComponentProps {
  url: string;
  scale: number;
  onLoaded: () => void;
}

export interface ObjModelProps extends ModelComponentProps {
  materialUrl?: string;
}

export interface ModelLoaderProps {
  modelFile: ModelFileInfo;
  scale: number;
  onLoaded: () => void;
  onError: (error: string) => void;
}

export interface CameraControllerProps {
  settings: CameraSettings;
  controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>;
}

export interface SceneContentProps {
  modelFile: ModelFileInfo | null;
  sceneSettings: SceneSettings;
  cameraSettings: CameraSettings;
  onLoaded: () => void;
  onError: (error: string) => void;
  controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>;
}

export interface SceneGridProps {
  backgroundColor: string;
}

export interface LoadingIndicatorProps {
  onProgress: (progress: number) => void;
}

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
