// Types
export interface QRCodeDecodeResult {
  text: string;
  format: string;
  timestamp: Date;
}

export interface DecodeFromFileContext {
  file: File;
}

// Source type for the decoded QR code
export type QRCodeSource = "file" | "camera" | "clipboard";

export interface DecodedQRCodeInfo {
  result: QRCodeDecodeResult;
  source: QRCodeSource;
  sourceInfo?: string; // file name, camera name, etc.
}
