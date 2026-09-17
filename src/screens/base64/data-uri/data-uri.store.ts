import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DataUriState {
  inputText: string;
  setInputText: (text: string) => void;
}

const stateCreator = (set: (partial: Partial<DataUriState>) => void): DataUriState => ({
  inputText: "",
  setInputText: (text) => set({ inputText: text }),
});

const PERSISTED_STORE_NAME = "etoolbox-data-uri";

const persistedStateCreator = persist<DataUriState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useDataUriStore = createDevToolsStore(PERSISTED_STORE_NAME, () =>
  create<DataUriState>()(persistedStateCreator)
);
