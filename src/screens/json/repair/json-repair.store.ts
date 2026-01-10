import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

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

export const useJsonRepairStore = create<JsonRepairState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
