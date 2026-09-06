import prettyBytes from "pretty-bytes";

import type { ResponsiveContext } from "~/utils/responsive.utils";

import { type ModelFileInfo, type ModelFormat, SUPPORTED_EXTENSIONS } from "./vr-3d-viewer.types";

export const determineCanvasHeight = ({ isMobile, isTablet }: ResponsiveContext) => {
  if (isMobile) return 300;
  if (isTablet) return 400;
  return 500;
};

const detectModelFormat = (fileName: string): ModelFormat => {
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

export const isSupportedFormat = (fileName: string): boolean => {
  const extension = "." + fileName.toLowerCase().split(".").pop();
  return SUPPORTED_EXTENSIONS.includes(extension);
};

export const formatModelInfo = (info: ModelFileInfo | null): string => {
  if (!info) return "";
  return `${info.name} (${prettyBytes(info.size)}) - ${info.format.toUpperCase()}`;
};

export const createModelFileInfo = (file: File): ModelFileInfo => {
  return {
    name: file.name,
    size: file.size,
    format: detectModelFormat(file.name),
    url: URL.createObjectURL(file),
  };
};
