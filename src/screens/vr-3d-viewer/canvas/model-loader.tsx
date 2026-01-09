import { useEffect } from "react";

import type { ModelLoaderProps } from "./canvas.types";
import { FbxModel } from "./fbx-model";
import { GltfModel } from "./gltf-model";
import { ObjModel } from "./obj-model";
import { StlModel } from "./stl-model";

/**
 * Dynamic model loader that selects the appropriate loader based on file format
 */
export const ModelLoader = ({ modelFile, scale, onLoaded, onError }: ModelLoaderProps) => {
  useEffect(() => {
    // Error boundary for unsupported formats
    if (modelFile.format === "unknown") {
      onError("Unsupported model format");
    }
  }, [modelFile.format, onError]);

  switch (modelFile.format) {
    case "gltf":
    case "glb":
      return <GltfModel url={modelFile.url} scale={scale} onLoaded={onLoaded} />;
    case "fbx":
      return <FbxModel url={modelFile.url} scale={scale} onLoaded={onLoaded} />;
    case "obj":
      return <ObjModel url={modelFile.url} materialUrl={modelFile.materialUrl} scale={scale} onLoaded={onLoaded} />;
    case "stl":
      return <StlModel url={modelFile.url} scale={scale} onLoaded={onLoaded} />;
    default:
      return null;
  }
};
