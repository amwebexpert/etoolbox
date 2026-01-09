import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface UrlParserState {
  inputUrl: string;
  setInputUrl: (url: string) => void;
}

const DEFAULT_URL = "https://codesandbox.io/dashboard/home?lastProject=WowWWW&name=Smith";

const stateCreator = (set: (partial: Partial<UrlParserState>) => void): UrlParserState => ({
  inputUrl: DEFAULT_URL,
  setInputUrl: (url) => set({ inputUrl: url }),
});

const PERSISTED_STORE_NAME = "etoolbox-url-parser";

const persistedStateCreator = persist<UrlParserState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useUrlParserStore = create<UrlParserState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }),
);
