import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface DiffViewerState {
  originalText: string;
  modifiedText: string;
  setOriginalText: (text: string) => void;
  setModifiedText: (text: string) => void;
}

const stateCreator = (set: (partial: Partial<DiffViewerState>) => void): DiffViewerState => ({
  originalText: "",
  modifiedText: "",
  setOriginalText: (text) => set({ originalText: text }),
  setModifiedText: (text) => set({ modifiedText: text }),
});

const PERSISTED_STORE_NAME = "etoolbox-diff-viewer";

const persistedStateCreator = persist<DiffViewerState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useDiffViewerStore = create<DiffViewerState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
