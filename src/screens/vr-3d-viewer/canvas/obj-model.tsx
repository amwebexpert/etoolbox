import type { ObjModelProps } from "./canvas.types";
import { ObjModelSimple } from "./obj-model-simple";
import { ObjModelWithMaterial } from "./obj-model-with-material";

export const ObjModel = ({ url, materialUrl, scale, onLoaded }: ObjModelProps) => {
  if (materialUrl) {
    return <ObjModelWithMaterial url={url} materialUrl={materialUrl} scale={scale} onLoaded={onLoaded} />;
  }
  return <ObjModelSimple url={url} scale={scale} onLoaded={onLoaded} />;
};
