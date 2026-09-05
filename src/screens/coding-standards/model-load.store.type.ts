/** Payloads emitted by `@xenova/transformers` `getModelFile` → `progress_callback`. habit-hooks-disable non-essential-comment */
export type ModelLoadHubProgressEvent =
  | ModelLoadHubProgressInitiate
  | ModelLoadHubProgressDownload
  | ModelLoadHubProgressProgress
  | ModelLoadHubProgressDone;

interface HubBase {
  name: string;
  file: string;
}

type ModelLoadHubProgressInitiate = HubBase & {
  status: "initiate";
};

type ModelLoadHubProgressDownload = HubBase & {
  status: "download";
};

type ModelLoadHubProgressProgress = HubBase & {
  status: "progress";
  progress: number;
  loaded?: number;
  total?: number;
};

type ModelLoadHubProgressDone = HubBase & {
  status: "done";
};

export type ModelLoadGlobalStatus = "idle" | "loading" | "ready" | "error";

type ModelFileLoadStatus = "pending" | "downloading" | "done" | "error";

export interface ModelFileLoadEntry {
  modelId: string;
  file: string;
  status: ModelFileLoadStatus;
  loaded?: number;
  total?: number;
  percent?: number;
  errorMessage?: string;
}

export type ModelFileLoadMap = Record<string, ModelFileLoadEntry>;

interface BuildModelFileKeyArgs {
  modelId: string;
  file: string;
}

export const buildModelFileKey = ({ modelId, file }: BuildModelFileKeyArgs): string => `${modelId}::${file}`;
