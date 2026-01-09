import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface JsonFormatterState {
  inputText: string;
  setInputText: (text: string) => void;
}

const DEFAULT_INPUT_TEXT = '{ "firstName": "Chuck", "lastName": "Norris" }';

const stateCreator = (set: (partial: Partial<JsonFormatterState>) => void): JsonFormatterState => ({
  inputText: DEFAULT_INPUT_TEXT,
  setInputText: (text) => set({ inputText: text }),
});

const PERSISTED_STORE_NAME = "etoolbox-json-formatter";

const persistedStateCreator = persist<JsonFormatterState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useJsonFormatterStore = create<JsonFormatterState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }),
);
