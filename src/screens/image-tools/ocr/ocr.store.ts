import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import {
  DEFAULT_EXTRACTED_TEXT,
  DEFAULT_IMAGE_DATA_URL,
  DEFAULT_LANGUAGE,
  INITIAL_WORKER_STATUS,
  PERSISTED_STORE_NAME,
  type WorkerStatus,
} from "./ocr.types";

interface OcrState {
  language: string;

  imageDataUrl: string;
  extractedText: string;
  workerStatus: WorkerStatus;

  setLanguage: (language: string) => void;
  setImageDataUrl: (dataUrl: string) => void;
  setExtractedText: (text: string) => void;
  setWorkerStatus: (status: WorkerStatus) => void;
  clearImage: () => void;
  clearAll: () => void;
}

const stateCreator = (set: (partial: Partial<OcrState>) => void): OcrState => ({
  language: DEFAULT_LANGUAGE,
  imageDataUrl: DEFAULT_IMAGE_DATA_URL,
  extractedText: DEFAULT_EXTRACTED_TEXT,
  workerStatus: INITIAL_WORKER_STATUS,

  setLanguage: (language) => set({ language }),
  setImageDataUrl: (dataUrl) => set({ imageDataUrl: dataUrl }),
  setExtractedText: (text) => set({ extractedText: text }),
  setWorkerStatus: (status) => set({ workerStatus: status }),

  clearImage: () =>
    set({
      imageDataUrl: DEFAULT_IMAGE_DATA_URL,
      extractedText: DEFAULT_EXTRACTED_TEXT,
      workerStatus: INITIAL_WORKER_STATUS,
    }),

  clearAll: () =>
    set({
      language: DEFAULT_LANGUAGE,
      imageDataUrl: DEFAULT_IMAGE_DATA_URL,
      extractedText: DEFAULT_EXTRACTED_TEXT,
      workerStatus: INITIAL_WORKER_STATUS,
    }),
});

const persistedStateCreator = persist<OcrState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
  // Only persist the language preference, not the image data or processing state habit-hooks-disable non-essential-comment
  partialize: (state) =>
    ({
      language: state.language,
    }) as OcrState,
});

export const useOcrStore = create<OcrState>()(devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }));

export const useSetWorkerStatus = () => useOcrStore((state) => state.setWorkerStatus);
