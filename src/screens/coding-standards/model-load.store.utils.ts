import { isNullish } from "@lichens-innovation/ts-common";

import {
  buildModelFileKey,
  type ModelFileLoadEntry,
  type ModelFileLoadMap,
  type ModelLoadHubProgressEvent,
} from "./model-load.store.type";

interface MutateEntryFromProgressArgs {
  event: ModelLoadHubProgressEvent;
  entry: ModelFileLoadEntry;
}

const mutateEntryFromProgress = ({ event, entry }: MutateEntryFromProgressArgs): void => {
  if (event.status === "initiate") {
    entry.status = "pending";
    return;
  }

  if (event.status === "download") {
    entry.status = "downloading";
    return;
  }

  if (event.status === "progress") {
    entry.status = "downloading";
    entry.percent = event.progress;
    if (!isNullish(event.loaded)) entry.loaded = event.loaded;
    if (!isNullish(event.total)) entry.total = event.total;
    return;
  }

  entry.status = "done";
  entry.percent = 100;
};

interface IngestHubEventArgs {
  fileLoads: ModelFileLoadMap;
  event: ModelLoadHubProgressEvent;
}

export const ingestHubEventIntoFileLoads = ({ fileLoads, event }: IngestHubEventArgs): void => {
  const file = event.file ?? "";
  const key = buildModelFileKey({ modelId: event.name, file });
  if (!fileLoads[key]) {
    fileLoads[key] = {
      modelId: event.name,
      file,
      status: "pending",
    };
  }

  mutateEntryFromProgress({ event, entry: fileLoads[key] });
};
