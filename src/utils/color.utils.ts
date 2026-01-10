/**
 * Normalized RGB color with values between 0 and 1.
 * Useful for graphics libraries like Three.js.
 */
export interface NormalizedRgb {
  r: number;
  g: number;
  b: number;
}

/**
 * Convert a hex color string to normalized RGB values (0-1 range).
 * @param hex - Hex color string (with or without # prefix)
 * @returns Normalized RGB object with values between 0 and 1
 */
export const hexToNormalizedRgb = (hex: string): NormalizedRgb => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : { r: 0, g: 0, b: 0 };
};

/**
 * Convert a hex color string to RGB values (0-255 range).
 * @param hex - Hex color string (with or without # prefix)
 * @returns RGB object with values between 0 and 255, or null if invalid
 */
export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Determine if a color is light or dark based on relative luminance.
 * Useful for choosing contrasting text colors.
 * @param hex - Hex color string
 * @returns True if the color is considered light (luminance > 0.5)
 */
export const isLightColor = (hex: string): boolean => {
  const rgb = hexToNormalizedRgb(hex);
  // Calculate relative luminance using standard coefficients
  const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  return luminance > 0.5;
};

/**
 * Convert RGB values to a hex color string.
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string with # prefix
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
