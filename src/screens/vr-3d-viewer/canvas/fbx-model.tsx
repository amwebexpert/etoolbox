import { Center } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

import type { ModelComponentProps } from "./canvas.types";

/**
 * Model loader component for FBX files
 */
export const FbxModel = ({ url, scale, onLoaded }: ModelComponentProps) => {
  const fbx = useLoader(FBXLoader, url);

  useEffect(() => {
    // Use requestAnimationFrame to defer callback until after the current render cycle
    const frameId = requestAnimationFrame(onLoaded);
    return () => cancelAnimationFrame(frameId);
  }, [fbx, onLoaded]);

  return (
    <Center>
      <primitive object={fbx} scale={scale * 0.01} />
    </Center>
  );
};
