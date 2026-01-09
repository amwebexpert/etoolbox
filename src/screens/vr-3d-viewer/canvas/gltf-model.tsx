import { Center } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import type { ModelComponentProps } from "./canvas.types";

/**
 * Model loader component for GLTF/GLB files
 */
export const GltfModel = ({ url, scale, onLoaded }: ModelComponentProps) => {
  const gltf = useLoader(GLTFLoader, url);

  useEffect(() => {
    // Use requestAnimationFrame to defer callback until after the current render cycle
    const frameId = requestAnimationFrame(onLoaded);
    return () => cancelAnimationFrame(frameId);
  }, [gltf, onLoaded]);

  return (
    <Center>
      <primitive object={gltf.scene} scale={scale} />
    </Center>
  );
};
