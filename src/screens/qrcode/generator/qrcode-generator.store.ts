import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { DEFAULT_INPUT_TEXT, DEFAULT_QR_OPTIONS, type QRCodeOptions } from "./qrcode-generator.types";

interface QRCodeGeneratorState {
  inputText: string;
  options: QRCodeOptions;
  showAdvancedOptions: boolean;
  setInputText: (text: string) => void;
  setOptions: (options: Partial<QRCodeOptions>) => void;
  setShowAdvancedOptions: (show: boolean) => void;
  resetOptions: () => void;
  clearAll: () => void;
}

const stateCreator = (
  set: (
    partial: Partial<QRCodeGeneratorState> | ((state: QRCodeGeneratorState) => Partial<QRCodeGeneratorState>),
  ) => void,
): QRCodeGeneratorState => ({
  inputText: DEFAULT_INPUT_TEXT,
  options: DEFAULT_QR_OPTIONS,
  showAdvancedOptions: false,
  setInputText: (text) => set({ inputText: text }),
  setOptions: (newOptions) =>
    set((state) => ({
      options: { ...state.options, ...newOptions },
    })),
  setShowAdvancedOptions: (show) => set({ showAdvancedOptions: show }),
  resetOptions: () => set({ options: DEFAULT_QR_OPTIONS }),
  clearAll: () =>
    set({
      inputText: "",
      options: DEFAULT_QR_OPTIONS,
      showAdvancedOptions: false,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-qrcode-generator";

const persistedStateCreator = persist<QRCodeGeneratorState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useQRCodeGeneratorStore = create<QRCodeGeneratorState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }),
);
