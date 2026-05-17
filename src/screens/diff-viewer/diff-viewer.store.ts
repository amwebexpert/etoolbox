import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface DiffViewerState {
  originalText: string;
  modifiedText: string;
  ignoreWhitespace: boolean;
  setOriginalText: (text: string) => void;
  setModifiedText: (text: string) => void;
  setIgnoreWhitespace: (value: boolean) => void;
  swapTexts: () => void;
}

type SetState = (
  partial:
    | Partial<DiffViewerState>
    | ((state: DiffViewerState) => Partial<DiffViewerState>)
) => void;

const stateCreator = (set: SetState): DiffViewerState => ({
  originalText: "",
  modifiedText: "",
  ignoreWhitespace: false,
  setOriginalText: (text) => set({ originalText: text }),
  setModifiedText: (text) => set({ modifiedText: text }),
  setIgnoreWhitespace: (value) => set({ ignoreWhitespace: value }),
  swapTexts: () =>
    set((state) => ({
      originalText: state.modifiedText,
      modifiedText: state.originalText,
    })),
});

const PERSISTED_STORE_NAME = "etoolbox-diff-viewer";

const persistedStateCreator = persist<DiffViewerState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useDiffViewerStore = create<DiffViewerState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
