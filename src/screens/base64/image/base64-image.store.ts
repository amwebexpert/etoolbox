import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface Base64ImageState {
  inputText: string;
  setInputText: (text: string) => void;
}

const stateCreator = (
  set: (partial: Partial<Base64ImageState>) => void
): Base64ImageState => ({
  inputText: "",
  setInputText: (text) => set({ inputText: text }),
});

const PERSISTED_STORE_NAME = "etoolbox-base64-image";

const persistedStateCreator = persist<Base64ImageState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useBase64ImageStore = create<Base64ImageState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
