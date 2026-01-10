import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import {
  DEFAULT_ROOT_CLASS_NAME,
  DEFAULT_SOURCE_TEXT,
  DEFAULT_SOURCE_TYPE,
  DEFAULT_TARGET_LANGUAGE,
} from "./json-converter.types";
import type { SourceType } from "./json-converter.types";

interface JsonConverterState {
  sourceText: string;
  sourceType: SourceType;
  targetLanguage: string;
  rootClassName: string;
  setSourceText: (text: string) => void;
  setSourceType: (type: SourceType) => void;
  setTargetLanguage: (language: string) => void;
  setRootClassName: (name: string) => void;
  clearAll: () => void;
}

const stateCreator = (set: (partial: Partial<JsonConverterState>) => void): JsonConverterState => ({
  sourceText: DEFAULT_SOURCE_TEXT,
  sourceType: DEFAULT_SOURCE_TYPE,
  targetLanguage: DEFAULT_TARGET_LANGUAGE,
  rootClassName: DEFAULT_ROOT_CLASS_NAME,
  setSourceText: (text) => set({ sourceText: text }),
  setSourceType: (type) => set({ sourceType: type }),
  setTargetLanguage: (language) => set({ targetLanguage: language }),
  setRootClassName: (name) => set({ rootClassName: name }),
  clearAll: () =>
    set({
      sourceText: "",
      sourceType: DEFAULT_SOURCE_TYPE,
      targetLanguage: DEFAULT_TARGET_LANGUAGE,
      rootClassName: DEFAULT_ROOT_CLASS_NAME,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-json-converter";

const persistedStateCreator = persist<JsonConverterState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useJsonConverterStore = create<JsonConverterState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
