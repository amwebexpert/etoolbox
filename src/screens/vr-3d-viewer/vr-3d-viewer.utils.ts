import prettyBytes from "pretty-bytes";

import type {
  BoundingBox,
  ModelFileInfo,
  ModelFormat,
  Vector3D,
} from "./vr-3d-viewer.types";
import { SUPPORTED_EXTENSIONS } from "./vr-3d-viewer.types";

/**
 * Detect the format of a 3D model file from its extension
 */
export const detectModelFormat = (fileName: string): ModelFormat => {
  const extension = fileName.toLowerCase().split(".").pop();

  switch (extension) {
    case "gltf":
      return "gltf";
    case "glb":
      return "glb";
    case "obj":
      return "obj";
    case "fbx":
      return "fbx";
    case "stl":
      return "stl";
    default:
      return "unknown";
  }
};

/**
 * Check if a file extension is supported
 */
export const isSupportedFormat = (fileName: string): boolean => {
  const extension = "." + fileName.toLowerCase().split(".").pop();
  return SUPPORTED_EXTENSIONS.includes(extension);
};

/**
 * Format model file info for display
 */
export const formatModelInfo = (info: ModelFileInfo | null): string => {
  if (!info) return "";
  return `${info.name} (${prettyBytes(info.size)}) - ${info.format.toUpperCase()}`;
};

/**
 * Create model file info from a file
 */
export const createModelFileInfo = (file: File): ModelFileInfo => {
  return {
    name: file.name,
    size: file.size,
    format: detectModelFormat(file.name),
    url: URL.createObjectURL(file),
  };
};

/**
 * Get a human-readable format description
 */
export const getFormatDescription = (format: ModelFormat): string => {
  switch (format) {
    case "gltf":
      return "glTF (GL Transmission Format)";
    case "glb":
      return "GLB (Binary glTF)";
    case "obj":
      return "OBJ (Wavefront)";
    case "fbx":
      return "FBX (Autodesk)";
    case "stl":
      return "STL (Stereolithography)";
    default:
      return "Unknown format";
  }
};

/**
 * Calculate bounding box center for model positioning
 */
export const calculateBoundingBoxCenter = (box: BoundingBox): Vector3D => {
  return {
    x: (box.min.x + box.max.x) / 2,
    y: (box.min.y + box.max.y) / 2,
    z: (box.min.z + box.max.z) / 2,
  };
};
