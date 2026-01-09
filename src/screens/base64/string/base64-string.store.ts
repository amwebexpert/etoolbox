import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface Base64StringState {
  inputText: string;
  outputText: string;
  setInputText: (text: string) => void;
  setOutputText: (text: string) => void;
  swapContent: () => void;
}

const stateCreator = (
  set: (partial: Partial<Base64StringState>) => void,
  get: () => Base64StringState,
): Base64StringState => ({
  inputText: "Chuck Norris can encode and decode Base64 with his mind.",
  outputText: "",
  setInputText: (text) => set({ inputText: text }),
  setOutputText: (text) => set({ outputText: text }),
  swapContent: () => {
    const { outputText } = get();
    set({ inputText: outputText, outputText: "" });
  },
});

const PERSISTED_STORE_NAME = "etoolbox-base64-string";

const persistedStateCreator = persist<Base64StringState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useBase64StringStore = create<Base64StringState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }),
);
