import { Center } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import type { ModelComponentProps, ObjModelProps } from "./canvas.types";

const ObjModelSimple = ({ url, scale, onLoaded }: ModelComponentProps) => {
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

const ObjModelWithMaterial = ({ url, materialUrl, scale, onLoaded }: ModelComponentProps & { materialUrl: string }) => {
  const materials = useLoader(MTLLoader, materialUrl);
  const obj = useLoader(OBJLoader, url, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    obj.position.sub(center);
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

export const ObjModel = ({ url, materialUrl, scale, onLoaded }: ObjModelProps) => {
  if (materialUrl) {
    return <ObjModelWithMaterial url={url} materialUrl={materialUrl} scale={scale} onLoaded={onLoaded} />;
  }
  return <ObjModelSimple url={url} scale={scale} onLoaded={onLoaded} />;
};
