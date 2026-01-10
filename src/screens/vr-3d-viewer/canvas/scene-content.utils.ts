import * as THREE from "three";

import { hexToNormalizedRgb } from "~/utils/color.utils";

/**
 * Computes a THREE.Color from a hex color string
 */
export const computeBackgroundColor = (hexColor: string): THREE.Color => {
  const rgb = hexToNormalizedRgb(hexColor);
  return new THREE.Color(rgb.r, rgb.g, rgb.b);
};
