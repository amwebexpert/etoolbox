import { Center } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

import type { ModelComponentProps } from "./canvas.types";

/**
 * Model loader component for STL files
 */
export const StlModel = ({ url, scale, onLoaded }: ModelComponentProps) => {
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (geometry) {
      geometry.center();
      geometry.computeVertexNormals();
      // Use requestAnimationFrame to defer callback until after the current render cycle
      const frameId = requestAnimationFrame(onLoaded);
      return () => cancelAnimationFrame(frameId);
    }
  }, [geometry, onLoaded]);

  return (
    <Center>
      <mesh ref={meshRef} geometry={geometry} scale={scale}>
        <meshStandardMaterial color="#808080" metalness={0.3} roughness={0.6} />
      </mesh>
    </Center>
  );
};
