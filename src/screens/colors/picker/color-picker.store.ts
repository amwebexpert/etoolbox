import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { RgbaColor } from "@lichens-innovation/ts-common";

interface ColorPickerState {
  imageDataUrl: string;
  color: RgbaColor;
  setImageDataUrl: (url: string) => void;
  setColor: (color: RgbaColor) => void;
  clearImage: () => void;
  clearAll: () => void;
}

const DEFAULT_COLOR: RgbaColor = { r: 59, g: 130, b: 246, a: 1 };

const stateCreator = (set: (partial: Partial<ColorPickerState>) => void): ColorPickerState => ({
  imageDataUrl: "",
  color: DEFAULT_COLOR,
  setImageDataUrl: (url) => set({ imageDataUrl: url }),
  setColor: (color) => set({ color }),
  clearImage: () => set({ imageDataUrl: "" }),
  clearAll: () => set({ imageDataUrl: "", color: DEFAULT_COLOR }),
});

const PERSISTED_STORE_NAME = "etoolbox-color-picker";

const persistedStateCreator = persist<ColorPickerState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useColorPickerStore = create<ColorPickerState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }),
);
