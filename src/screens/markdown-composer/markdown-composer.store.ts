import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type MarkdownComposerEngine = "handlebars" | "eta" | "liquidjs";

export const DEFAULT_MARKDOWN = "# Hello {{name}}\n\nWelcome to the Markdown Composer.";
export const DEFAULT_JSON_DATA_TEXT = `{
  "name": "world"
}`;

interface MarkdownComposerState {
  markdown: string;
  jsonDataText: string;
  engine: MarkdownComposerEngine;
  setMarkdown: (markdown: string) => void;
  setJsonDataText: (text: string) => void;
  setEngine: (engine: MarkdownComposerEngine) => void;
}

type SetState = (
  partial: Partial<MarkdownComposerState> | ((state: MarkdownComposerState) => Partial<MarkdownComposerState>)
) => void;

const stateCreator = (set: SetState): MarkdownComposerState => ({
  markdown: DEFAULT_MARKDOWN,
  jsonDataText: DEFAULT_JSON_DATA_TEXT,
  engine: "handlebars",
  setMarkdown: (markdown) => set({ markdown }),
  setJsonDataText: (jsonDataText) => set({ jsonDataText }),
  setEngine: (engine) => set({ engine }),
});

const PERSISTED_STORE_NAME = "etoolbox-markdown-composer";

const persistedStateCreator = persist<MarkdownComposerState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    markdown: state.markdown,
    jsonDataText: state.jsonDataText,
    engine: state.engine,
    setMarkdown: state.setMarkdown,
    setJsonDataText: state.setJsonDataText,
    setEngine: state.setEngine,
  }),
});

export const useMarkdownComposerStore = create<MarkdownComposerState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);
