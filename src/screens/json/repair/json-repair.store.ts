import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface JsonRepairState {
  inputText: string;
  setInputText: (text: string) => void;
  clearInput: () => void;
}

const DEFAULT_INPUT_TEXT = "";

const stateCreator = (set: (partial: Partial<JsonRepairState>) => void): JsonRepairState => ({
  inputText: DEFAULT_INPUT_TEXT,
  setInputText: (text) => set({ inputText: text }),
  clearInput: () => set({ inputText: "" }),
});

const PERSISTED_STORE_NAME = "etoolbox-json-repair";

const persistedStateCreator = persist<JsonRepairState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useJsonRepairStore = createDevToolsStore(PERSISTED_STORE_NAME, () =>
  create<JsonRepairState>()(persistedStateCreator)
);
