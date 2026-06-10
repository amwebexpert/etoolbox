import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { CompressorResizeMode, CompressorSettings } from "./compressor.types";

export const COMPRESSOR_DEFAULTS: CompressorSettings = {
  quality: 0.8,
  mimeType: "auto",
  maxWidth: 4096,
  maxHeight: 4096,
  minWidth: 0,
  minHeight: 0,
  width: 0,
  height: 0,
  resize: "none",
  convertSize: 5_000_000,
  checkOrientation: true,
};

interface CompressorActions {
  setShowCompressionSettings: (show: boolean) => void;
  setQuality: (value: number) => void;
  setMimeType: (value: string) => void;
  setMaxWidth: (value: number) => void;
  setMaxHeight: (value: number) => void;
  setMinWidth: (value: number) => void;
  setMinHeight: (value: number) => void;
  setWidth: (value: number) => void;
  setHeight: (value: number) => void;
  setResize: (value: CompressorResizeMode) => void;
  setConvertSize: (value: number) => void;
  setCheckOrientation: (value: boolean) => void;
  setSelectedFile: (file: File) => void;
  clearSelectedFile: () => void;
}

export type CompressorStoreState = CompressorSettings & {
  selectedFile: File | null;
  showCompressionSettings: boolean;
} & CompressorActions;

type SetState = (partial: Partial<CompressorStoreState>) => void;

const stateCreator = (set: SetState): CompressorStoreState => ({
  ...COMPRESSOR_DEFAULTS,
  selectedFile: null,
  showCompressionSettings: false,
  setShowCompressionSettings: (showCompressionSettings) => set({ showCompressionSettings }),
  setQuality: (quality) => set({ quality }),
  setMimeType: (mimeType) => set({ mimeType }),
  setMaxWidth: (maxWidth) => set({ maxWidth }),
  setMaxHeight: (maxHeight) => set({ maxHeight }),
  setMinWidth: (minWidth) => set({ minWidth }),
  setMinHeight: (minHeight) => set({ minHeight }),
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setResize: (resize) => set({ resize }),
  setConvertSize: (convertSize) => set({ convertSize }),
  setCheckOrientation: (checkOrientation) => set({ checkOrientation }),
  setSelectedFile: (file) => set({ selectedFile: file }),
  clearSelectedFile: () => set({ selectedFile: null }),
});

const PERSISTED_STORE_NAME = "etoolbox-compressor";

const persistedStateCreator = persist<CompressorStoreState, [], [], CompressorSettings>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    quality: state.quality,
    mimeType: state.mimeType,
    maxWidth: state.maxWidth,
    maxHeight: state.maxHeight,
    minWidth: state.minWidth,
    minHeight: state.minHeight,
    width: state.width,
    height: state.height,
    resize: state.resize,
    convertSize: state.convertSize,
    checkOrientation: state.checkOrientation,
  }),
});

export const useCompressorStore = create<CompressorStoreState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
