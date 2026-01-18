import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { DEFAULT_REACT_JSON_VIEW_CONFIG, type ReactJsonViewConfig, type ViewMode } from "./json-formatter.types";

interface JsonFormatterState {
  inputText: string;
  setInputText: (text: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  reactJsonConfig: ReactJsonViewConfig;
  setReactJsonConfig: (config: ReactJsonViewConfig) => void;
  resetReactJsonConfig: () => void;
}

const DEFAULT_INPUT_TEXT = '{ "firstName": "Chuck", "lastName": "Norris" }';

const stateCreator = (set: (partial: Partial<JsonFormatterState>) => void): JsonFormatterState => ({
  inputText: DEFAULT_INPUT_TEXT,
  setInputText: (text) => set({ inputText: text }),
  viewMode: "syntax-highlight",
  setViewMode: (mode) => set({ viewMode: mode }),
  reactJsonConfig: DEFAULT_REACT_JSON_VIEW_CONFIG,
  setReactJsonConfig: (config) => set({ reactJsonConfig: config }),
  resetReactJsonConfig: () => set({ reactJsonConfig: DEFAULT_REACT_JSON_VIEW_CONFIG }),
});

const PERSISTED_STORE_NAME = "etoolbox-json-formatter";

const persistedStateCreator = persist<JsonFormatterState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useJsonFormatterStore = create<JsonFormatterState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
