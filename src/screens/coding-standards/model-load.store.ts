import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { ModelFileLoadMap, ModelLoadGlobalStatus, ModelLoadHubProgressEvent } from "./model-load.store.type";
import { ingestHubEventIntoFileLoads } from "./model-load.store.utils";

export interface ModelLoadStore {
  fileLoads: ModelFileLoadMap;
  globalStatus: ModelLoadGlobalStatus;
  globalErrorMessage: string;
  reset: () => void;
  setGlobalLoading: () => void;
  setGlobalReady: () => void;
  setGlobalError: (message: string) => void;
  ingestHubEvent: (event: ModelLoadHubProgressEvent) => void;
}

export const useModelLoadStore = create<ModelLoadStore>()(
  immer((set) => ({
    fileLoads: {},
    globalStatus: "idle",
    globalErrorMessage: "",

    reset: () =>
      set((state) => {
        state.fileLoads = {};
        state.globalStatus = "idle";
        state.globalErrorMessage = "";
      }),

    setGlobalLoading: () =>
      set((state) => {
        state.globalStatus = "loading";
        state.globalErrorMessage = "";
      }),

    setGlobalReady: () =>
      set((state) => {
        state.globalStatus = "ready";
        state.globalErrorMessage = "";
      }),

    setGlobalError: (message: string) =>
      set((state) => {
        state.globalStatus = "error";
        state.globalErrorMessage = message;
      }),

    ingestHubEvent: (event: ModelLoadHubProgressEvent) =>
      set((state) => {
        ingestHubEventIntoFileLoads({ fileLoads: state.fileLoads, event });
      }),
  }))
);

export const useIngestHubEvent = () => useModelLoadStore((state) => state.ingestHubEvent);
export const useModelLoadFileLoads = () => useModelLoadStore((state) => state.fileLoads);
export const useModelLoadGlobalStatus = () => useModelLoadStore((state) => state.globalStatus);
export const useModelLoadGlobalErrorMessage = () => useModelLoadStore((state) => state.globalErrorMessage);
