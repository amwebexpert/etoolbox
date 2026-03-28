import { Flex } from "antd";
import type { ModelFileLoadEntry } from "../../model-load.store.type";
import { ModelLoadingProgressFileRow } from "./model-loading-progress-file-row";

interface ModelLoadingProgressFileListProps {
  entries: [string, ModelFileLoadEntry][];
}

export const ModelLoadingProgressFileList = ({ entries }: ModelLoadingProgressFileListProps) => (
  <Flex vertical gap={8}>
    {entries.map(([key, entry]) => (
      <ModelLoadingProgressFileRow key={key} entry={entry} />
    ))}
  </Flex>
);
