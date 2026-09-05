// Types
export interface QRCodeDecodeResult {
  text: string;
  format: string;
  timestamp: Date;
}

export interface DecodeFromFileContext {
  file: File;
}
