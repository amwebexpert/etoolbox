import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const DEFAULT_MARKDOWN = "# Hello\n\nStart writing...";

interface MarkdownEditorState {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

type SetState = (
  partial: Partial<MarkdownEditorState> | ((state: MarkdownEditorState) => Partial<MarkdownEditorState>)
) => void;

const stateCreator = (set: SetState): MarkdownEditorState => ({
  markdown: DEFAULT_MARKDOWN,
  setMarkdown: (markdown) => set({ markdown }),
});

const PERSISTED_STORE_NAME = "etoolbox-markdown-editor";

const persistedStateCreator = persist<MarkdownEditorState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    markdown: state.markdown,
    setMarkdown: state.setMarkdown,
  }),
});

export const useMarkdownEditorStore = create<MarkdownEditorState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
