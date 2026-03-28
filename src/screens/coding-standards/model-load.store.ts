import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mutateEntryFromProgress } from "./model-load.store.utils";
import {
  buildModelFileKey,
  type ModelFileLoadMap,
  type ModelLoadGlobalStatus,
  type ModelLoadHubProgressEvent,
} from "./model-load.store.type";

export type ModelLoadStore = {
  fileLoads: ModelFileLoadMap;
  globalStatus: ModelLoadGlobalStatus;
  globalErrorMessage: string;
  reset: () => void;
  setGlobalLoading: () => void;
  setGlobalReady: () => void;
  setGlobalError: (message: string) => void;
  ingestHubEvent: (event: ModelLoadHubProgressEvent) => void;
};

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
        const file = event.file ?? "";
        const key = buildModelFileKey(event.name, file);
        if (!state.fileLoads[key]) {
          state.fileLoads[key] = {
            modelId: event.name,
            file,
            status: "pending",
          };
        }

        mutateEntryFromProgress({ event, entry: state.fileLoads[key] });
      }),
  }))
);

export const useIngestHubEvent = () => useModelLoadStore((state) => state.ingestHubEvent);
