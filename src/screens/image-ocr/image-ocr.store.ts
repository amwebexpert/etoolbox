import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import {
  DEFAULT_EXTRACTED_TEXT,
  DEFAULT_IMAGE_DATA_URL,
  DEFAULT_LANGUAGE,
  INITIAL_WORKER_STATUS,
  PERSISTED_STORE_NAME,
} from "./image-ocr.types";
import type { WorkerStatus } from "./image-ocr.types";

interface ImageOcrState {
  // Persisted preferences
  language: string;

  // Session state (not persisted but managed here for convenience)
  imageDataUrl: string;
  extractedText: string;
  workerStatus: WorkerStatus;

  // Actions
  setLanguage: (language: string) => void;
  setImageDataUrl: (dataUrl: string) => void;
  setExtractedText: (text: string) => void;
  setWorkerStatus: (status: WorkerStatus) => void;
  clearImage: () => void;
  clearAll: () => void;
}

const stateCreator = (set: (partial: Partial<ImageOcrState>) => void): ImageOcrState => ({
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

const persistedStateCreator = persist<ImageOcrState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
  // Only persist the language preference, not the image data or processing state
  partialize: (state) =>
    ({
      language: state.language,
    }) as ImageOcrState,
});

export const useImageOcrStore = create<ImageOcrState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }),
);
