import { Flex, Progress, Typography, theme } from "antd";
import type { ModelFileLoadEntry } from "../../model-load.store.type";
import { formatModelFileLoadByteHint, getModelFileLoadProgressPercent } from "./model-loading-progress.utils";

const { Text } = Typography;

interface ModelLoadingProgressFileRowProps {
  entry: ModelFileLoadEntry;
}

export const ModelLoadingProgressFileRow = ({ entry }: ModelLoadingProgressFileRowProps) => {
  const { token } = theme.useToken();

  return (
    <Flex vertical gap={4}>
      <Flex align="baseline" gap={8} style={{ minWidth: 0, width: "100%" }}>
        <Text
          ellipsis
          title={entry.file}
          style={{ flex: 1, minWidth: 0, fontSize: 13, fontFamily: token.fontFamilyCode }}
        >
          {entry.file}
        </Text>
        <Text type="secondary" style={{ flexShrink: 0, fontSize: 12, fontFamily: token.fontFamilyCode }}>
          {formatModelFileLoadByteHint(entry)}
        </Text>
      </Flex>

      <Progress
        percent={getModelFileLoadProgressPercent(entry)}
        status={entry.status === "done" ? "success" : "active"}
        showInfo={false}
      />
    </Flex>
  );
};
