import { createDevToolsStore } from "@sucoza/zustand-devtools-plugin";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PinnedToolsState {
  pinnedPaths: string[];
  togglePinned: (path: string) => void;
}

type SetState = (partial: Partial<PinnedToolsState> | ((state: PinnedToolsState) => Partial<PinnedToolsState>)) => void;

const stateCreator = (set: SetState): PinnedToolsState => ({
  pinnedPaths: [],
  togglePinned: (path) =>
    set((state) => ({
      pinnedPaths: state.pinnedPaths.includes(path)
        ? state.pinnedPaths.filter((pinnedPath) => pinnedPath !== path)
        : [...state.pinnedPaths, path],
    })),
});

const PERSISTED_STORE_NAME = "etoolbox-pinned-tools";

const persistedStateCreator = persist<PinnedToolsState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const usePinnedToolsStore = createDevToolsStore(PERSISTED_STORE_NAME, () =>
  create<PinnedToolsState>()(persistedStateCreator)
);

export const usePinnedPaths = (): string[] => usePinnedToolsStore((state) => state.pinnedPaths);
export const useTogglePinned = (): ((path: string) => void) => usePinnedToolsStore((state) => state.togglePinned);
