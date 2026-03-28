import { isNullish } from "@lichens-innovation/ts-common";

import { formatBytesPretty } from "~/utils/number-format.utils";
import type { ModelFileLoadEntry } from "../../model-load.store.type";

export const sortModelFileLoadEntries = (entries: [string, ModelFileLoadEntry][]): [string, ModelFileLoadEntry][] =>
  [...entries].sort((a, b) => (a[1].file ?? "").localeCompare(b[1].file ?? ""));

export const getModelFileLoadProgressPercent = (entry: ModelFileLoadEntry): number | undefined => {
  if (entry.status === "done") return 100;

  if (!isNullish(entry.percent) && Number.isFinite(entry.percent)) {
    return Math.round(Math.min(100, Math.max(0, entry.percent)));
  }

  return undefined;
};

export const formatModelFileLoadByteHint = (entry: ModelFileLoadEntry): string => {
  const { loaded, total } = entry;

  if (!isNullish(loaded) && !isNullish(total) && total > 0) {
    return `${formatBytesPretty(loaded)} / ${formatBytesPretty(total)}`;
  }

  if (!isNullish(loaded)) {
    return formatBytesPretty(loaded);
  }

  return "";
};
