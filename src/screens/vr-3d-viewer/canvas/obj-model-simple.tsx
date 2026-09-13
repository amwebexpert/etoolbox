import { Center } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import type { ModelComponentProps } from "./canvas.types";

export const ObjModelSimple = ({ url, scale, onLoaded }: ModelComponentProps) => {
  const obj = useLoader(OBJLoader, url);

  useEffect(() => {
    // Use requestAnimationFrame to defer callback until after the current render cycle habit-hooks-disable non-essential-comment
    const frameId = requestAnimationFrame(onLoaded);
    return () => cancelAnimationFrame(frameId);
  }, [obj, onLoaded]);

  return (
    <Center>
      <primitive object={obj} scale={scale} />
    </Center>
  );
};
