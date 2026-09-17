import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UrlEncoderState {
  inputText: string;
  outputText: string;
  setInputText: (text: string) => void;
  setOutputText: (text: string) => void;
  swapContent: () => void;
}

const stateCreator = (
  set: (partial: Partial<UrlEncoderState>) => void,
  get: () => UrlEncoderState
): UrlEncoderState => ({
  inputText: "Chuck Norris can chuck more wood than a woodchuck could.",
  outputText: "",
  setInputText: (text) => set({ inputText: text }),
  setOutputText: (text) => set({ outputText: text }),
  swapContent: () => {
    const { outputText } = get();
    set({ inputText: outputText, outputText: "" });
  },
});

const PERSISTED_STORE_NAME = "etoolbox-url-encoder";

const persistedStateCreator = persist<UrlEncoderState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useUrlEncoderStore = createDevToolsStore(PERSISTED_STORE_NAME, () =>
  create<UrlEncoderState>()(persistedStateCreator)
);
