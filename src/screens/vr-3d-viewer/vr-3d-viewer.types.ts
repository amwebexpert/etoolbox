// Supported 3D model file formats
export type ModelFormat = "gltf" | "glb" | "obj" | "fbx" | "stl" | "unknown";

// Model file information
export interface ModelFileInfo {
  name: string;
  size: number;
  format: ModelFormat;
  url: string;
  /** Optional material URL for OBJ files with MTL materials */
  materialUrl?: string;
  /** Suggested scale for this model (used for demo models with known dimensions) */
  suggestedScale?: number;
}

// Lighting presets
export type LightingPreset = "studio" | "outdoor" | "dramatic" | "soft";

// Camera controls settings
export interface CameraSettings {
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableZoom: boolean;
  enablePan: boolean;
  minDistance: number;
  maxDistance: number;
}

// Scene settings
export interface SceneSettings {
  backgroundColor: string;
  showGrid: boolean;
  showAxes: boolean;
  lightingPreset: LightingPreset;
  ambientIntensity: number;
  modelScale: number;
}

// View mode for the 3D viewer
export type ViewMode = "normal" | "wireframe";

// 3D Vector type for positions/coordinates
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

// Bounding box with min/max corners
export interface BoundingBox {
  min: Vector3D;
  max: Vector3D;
}

// RGB color values normalized to 0-1 range (for Three.js)
export interface NormalizedRgb {
  r: number;
  g: number;
  b: number;
}

// Constants
export const DEFAULT_CAMERA_SETTINGS: CameraSettings = {
  autoRotate: false,
  autoRotateSpeed: 2,
  enableZoom: true,
  enablePan: true,
  minDistance: 0.5,
  maxDistance: 100,
};

export const DEFAULT_SCENE_SETTINGS: SceneSettings = {
  backgroundColor: "#1a1a2e",
  showGrid: true,
  showAxes: false,
  lightingPreset: "studio",
  ambientIntensity: 0.5,
  modelScale: 1,
};

export const SUPPORTED_EXTENSIONS = [".gltf", ".glb", ".obj", ".fbx", ".stl"];

export const ACCEPT_3D_FILES = SUPPORTED_EXTENSIONS.join(",");

interface LightingPresetOption {
  value: LightingPreset;
  label: string;
}

export const LIGHTING_PRESET_OPTIONS: LightingPresetOption[] = [
  { value: "studio", label: "Studio" },
  { value: "outdoor", label: "Outdoor" },
  { value: "dramatic", label: "Dramatic" },
  { value: "soft", label: "Soft" },
];

export const BACKGROUND_COLOR_OPTIONS = [
  { value: "#1a1a2e", label: "Dark Blue" },
  { value: "#0f0f0f", label: "Dark" },
  { value: "#2d2d2d", label: "Gray" },
  { value: "#1e3a5f", label: "Navy" },
  { value: "#2d1b4e", label: "Purple" },
  { value: "#1b3d2f", label: "Forest" },
  { value: "#f5f5f5", label: "Light" },
  { value: "#ffffff", label: "White" },
];

export const MODEL_SCALE_OPTIONS = [
  { value: 0.01, label: "0.01x" },
  { value: 0.1, label: "0.1x" },
  { value: 0.5, label: "0.5x" },
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
  { value: 5, label: "5x" },
  { value: 10, label: "10x" },
  { value: 100, label: "100x" },
];

// Default demo model (R2-D2 from learnthreejs)
const DEFAULT_MODEL_BASE_URL =
  "https://raw.githubusercontent.com/learnthreejs/three-js-boilerplate/master/public/examples/3d-obj-loader/assets";

export const DEFAULT_DEMO_MODEL: ModelFileInfo = {
  name: "R2-D2 (Demo)",
  size: 0,
  format: "obj",
  url: `${DEFAULT_MODEL_BASE_URL}/r2-d2.obj`,
  materialUrl: `${DEFAULT_MODEL_BASE_URL}/r2-d2.mtl`,
  suggestedScale: 0.02,
};
