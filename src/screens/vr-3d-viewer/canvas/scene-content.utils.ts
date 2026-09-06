import { hexToNormalizedRgb } from "@lichens-innovation/ts-common";
import * as THREE from "three";

export const computeBackgroundColor = (hexColor: string): THREE.Color => {
  const rgb = hexToNormalizedRgb(hexColor);
  return new THREE.Color(rgb.r, rgb.g, rgb.b);
};
