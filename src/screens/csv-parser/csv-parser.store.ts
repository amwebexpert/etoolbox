import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { CsvParseResult, CsvParserOptions, FileInfo, ViewMode } from "./csv-parser.types";
import { DEFAULT_CSV_OPTIONS, DEFAULT_ENCODING } from "./csv-parser.types";

interface CsvParserState {
  // Input state
  csvInput: string;
  fileEncoding: string;
  parserOptions: CsvParserOptions;
  fileInfo: FileInfo | null;

  // View state
  viewMode: ViewMode;

  // Result state (non-persisted, but managed by store)
  parseResult: CsvParseResult | null;

  // Actions
  setCsvInput: (input: string) => void;
  setFileEncoding: (encoding: string) => void;
  setParserOptions: (options: Partial<CsvParserOptions>) => void;
  setFileInfo: (info: FileInfo | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setParseResult: (result: CsvParseResult | null) => void;
  clearAll: () => void;
  clearResult: () => void;
}

const INITIAL_STATE = {
  csvInput: "",
  fileEncoding: DEFAULT_ENCODING,
  parserOptions: DEFAULT_CSV_OPTIONS,
  fileInfo: null,
  viewMode: "json" as ViewMode,
  parseResult: null,
};

type SetState = (partial: Partial<CsvParserState> | ((state: CsvParserState) => Partial<CsvParserState>)) => void;

const stateCreator = (set: SetState): CsvParserState => ({
  ...INITIAL_STATE,

  setCsvInput: (input) => set({ csvInput: input }),
  setFileEncoding: (encoding) => set({ fileEncoding: encoding }),
  setParserOptions: (options) => set((state) => ({ parserOptions: { ...state.parserOptions, ...options } })),
  setFileInfo: (info) => set({ fileInfo: info }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setParseResult: (result) => set({ parseResult: result }),

  clearAll: () =>
    set({
      csvInput: "",
      fileInfo: null,
      parseResult: null,
      parserOptions: DEFAULT_CSV_OPTIONS,
    }),

  clearResult: () => set({ parseResult: null }),
});

const PERSISTED_STORE_NAME = "etoolbox-csv-parser";

const persistedStateCreator = persist<CsvParserState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    // Only persist these fields
    csvInput: state.csvInput,
    fileEncoding: state.fileEncoding,
    parserOptions: state.parserOptions,
    viewMode: state.viewMode,
    // Don't persist fileInfo and parseResult
    fileInfo: null,
    parseResult: null,
    // Include actions (they will be overwritten by the stateCreator)
    setCsvInput: state.setCsvInput,
    setFileEncoding: state.setFileEncoding,
    setParserOptions: state.setParserOptions,
    setFileInfo: state.setFileInfo,
    setViewMode: state.setViewMode,
    setParseResult: state.setParseResult,
    clearAll: state.clearAll,
    clearResult: state.clearResult,
  }),
});

export const useCsvParserStore = create<CsvParserState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
