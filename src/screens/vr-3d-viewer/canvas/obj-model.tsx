import { Center } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import type { ModelComponentProps, ObjModelProps } from "./canvas.types";

/**
 * Simple OBJ model loader without materials
 */
const ObjModelSimple = ({ url, scale, onLoaded }: ModelComponentProps) => {
  const obj = useLoader(OBJLoader, url);

  useEffect(() => {
    // Use requestAnimationFrame to defer callback until after the current render cycle
    const frameId = requestAnimationFrame(onLoaded);
    return () => cancelAnimationFrame(frameId);
  }, [obj, onLoaded]);

  return (
    <Center>
      <primitive object={obj} scale={scale} />
    </Center>
  );
};

/**
 * OBJ model loader with MTL materials
 */
const ObjModelWithMaterial = ({ url, materialUrl, scale, onLoaded }: ModelComponentProps & { materialUrl: string }) => {
  const materials = useLoader(MTLLoader, materialUrl);
  const obj = useLoader(OBJLoader, url, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  useEffect(() => {
    // Center the object by computing its bounding box
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    obj.position.sub(center);
    // Use requestAnimationFrame to defer callback until after the current render cycle
    const frameId = requestAnimationFrame(onLoaded);
    return () => cancelAnimationFrame(frameId);
  }, [obj, onLoaded]);

  return (
    <Center>
      <primitive object={obj} scale={scale} />
    </Center>
  );
};

/**
 * OBJ model loader with optional materials
 * Automatically selects the appropriate loader based on whether materials are provided
 */
export const ObjModel = ({ url, materialUrl, scale, onLoaded }: ObjModelProps) => {
  if (materialUrl) {
    return <ObjModelWithMaterial url={url} materialUrl={materialUrl} scale={scale} onLoaded={onLoaded} />;
  }
  return <ObjModelSimple url={url} scale={scale} onLoaded={onLoaded} />;
};
