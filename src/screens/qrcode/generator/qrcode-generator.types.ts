// Types
export interface SelectOption<T = string> {
  value: T;
  label: string;
}

export type QRCodeImgMimeType = "image/png" | "image/jpeg" | "image/webp";
export type QRCodeErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export interface QRCodeOptions {
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  type: QRCodeImgMimeType;
  width: number;
  quality: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
}

export interface GenerateQRCodeContext {
  text: string;
  options: QRCodeOptions;
}

// Constants
export const DEFAULT_QR_OPTIONS: QRCodeOptions = {
  errorCorrectionLevel: "H",
  type: "image/png",
  width: 200,
  quality: 0.92,
  margin: 1,
  color: {
    dark: "#000000FF",
    light: "#FFFFFFFF",
  },
};

export const DEFAULT_INPUT_TEXT = "https://example.com";

export const ERROR_CORRECTION_LEVELS: readonly SelectOption<QRCodeErrorCorrectionLevel>[] = [
  { value: "L", label: "Low (~7%)" },
  { value: "M", label: "Medium (~15%)" },
  { value: "Q", label: "Quartile (~25%)" },
  { value: "H", label: "High (~30%)" },
];

export const IMAGE_TYPES: readonly SelectOption<QRCodeImgMimeType>[] = [
  { value: "image/png", label: "PNG" },
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/webp", label: "WebP" },
];

export const WIDTH_PRESETS: readonly SelectOption<number>[] = [
  { value: 100, label: "100px" },
  { value: 150, label: "150px" },
  { value: 200, label: "200px" },
  { value: 250, label: "250px" },
  { value: 300, label: "300px" },
  { value: 400, label: "400px" },
  { value: 500, label: "500px" },
];
