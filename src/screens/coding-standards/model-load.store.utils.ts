import { isNullish } from "@lichens-innovation/ts-common";
import type { ModelFileLoadEntry, ModelLoadHubProgressEvent } from "./model-load.store.type";

type MutateEntryFromProgressArgs = {
  event: ModelLoadHubProgressEvent;
  entry: ModelFileLoadEntry;
};

export const mutateEntryFromProgress = ({ event, entry }: MutateEntryFromProgressArgs): void => {
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
