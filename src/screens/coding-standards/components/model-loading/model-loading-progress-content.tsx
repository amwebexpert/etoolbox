import { Flex, Progress, Spin, Typography } from "antd";
import type { ModelFileLoadEntry } from "../../model-load.store.type";
import { ModelLoadingProgressFileList } from "./model-loading-progress-file-list";

const { Text, Title } = Typography;

interface ModelLoadingProgressContentProps {
  isError: boolean;
  isBusyLoading: boolean;
  hasFileEntries: boolean;
  fileEntries: [string, ModelFileLoadEntry][];
}

export const ModelLoadingProgressContent = ({
  isError,
  isBusyLoading,
  hasFileEntries,
  fileEntries,
}: ModelLoadingProgressContentProps) => {
  return (
    <>
      <Spin size="large" spinning={isBusyLoading} />

      <Flex vertical flex={1} style={{ minWidth: 0 }} gap={8}>
        <Title level={5} style={{ margin: 0 }}>
          {isError ? "Model Loading Error" : "Loading AI Model"}
        </Title>

        {!isError && (
          <Text type="secondary" style={{ margin: 0 }}>
            Downloading model files (Transformer.js). Progress is shown per file below.
          </Text>
        )}

        {isBusyLoading && hasFileEntries && <ModelLoadingProgressFileList entries={fileEntries} />}

        {isBusyLoading && !hasFileEntries && (
          <Flex vertical gap={8}>
            <Progress percent={undefined} status="active" showInfo={false} />
            <Text type="secondary" style={{ margin: 0, fontSize: 12, fontStyle: "italic" }}>
              Preparing download. This may take 30–60 seconds on first load; files are cached afterward.
            </Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};
