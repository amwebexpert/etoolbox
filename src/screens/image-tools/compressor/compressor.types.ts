import type Compressor from "compressorjs";

export type CompressorResizeMode = NonNullable<Compressor.Options["resize"]>;

export interface CompressorSettings {
  quality: number;
  mimeType: string;
  maxWidth: number;
  maxHeight: number;
  minWidth: number;
  minHeight: number;
  width: number;
  height: number;
  resize: CompressorResizeMode;
  convertSize: number;
  checkOrientation: boolean;
}
