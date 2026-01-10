import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface UrlCurlState {
  inputCurl: string;
  targetLanguage: string;
  transformedResult: string;
  setInputCurl: (curl: string) => void;
  setTargetLanguage: (language: string) => void;
  setTransformedResult: (result: string) => void;
}

const DEFAULT_CURL = `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token123" \\
  -d '{"name": "John", "email": "john@example.com"}'`;

const stateCreator = (set: (partial: Partial<UrlCurlState>) => void): UrlCurlState => ({
  inputCurl: DEFAULT_CURL,
  targetLanguage: "JavaScript (Fetch)",
  transformedResult: "",
  setInputCurl: (curl) => set({ inputCurl: curl }),
  setTargetLanguage: (language) => set({ targetLanguage: language }),
  setTransformedResult: (result) => set({ transformedResult: result }),
});

const PERSISTED_STORE_NAME = "etoolbox-url-curl";

const persistedStateCreator = persist<UrlCurlState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useUrlCurlStore = create<UrlCurlState>()(devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }));
