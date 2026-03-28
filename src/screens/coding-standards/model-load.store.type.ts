/** Payloads emitted by `@xenova/transformers` `getModelFile` → `progress_callback`. */
export type ModelLoadHubProgressEvent =
  | ModelLoadHubProgressInitiate
  | ModelLoadHubProgressDownload
  | ModelLoadHubProgressProgress
  | ModelLoadHubProgressDone;

type HubBase = {
  name: string;
  file: string;
};

export type ModelLoadHubProgressInitiate = HubBase & {
  status: "initiate";
};

export type ModelLoadHubProgressDownload = HubBase & {
  status: "download";
};

export type ModelLoadHubProgressProgress = HubBase & {
  status: "progress";
  progress: number;
  loaded?: number;
  total?: number;
};

export type ModelLoadHubProgressDone = HubBase & {
  status: "done";
};

export type ModelLoadGlobalStatus = "idle" | "loading" | "ready" | "error";

export type ModelFileLoadStatus = "pending" | "downloading" | "done" | "error";

export type ModelFileLoadEntry = {
  modelId: string;
  file: string;
  status: ModelFileLoadStatus;
  loaded?: number;
  total?: number;
  percent?: number;
  errorMessage?: string;
};

export type ModelFileLoadMap = Record<string, ModelFileLoadEntry>;

export const buildModelFileKey = (modelId: string, file: string): string => `${modelId}::${file}`;
