import { Card, Flex } from "antd";
import { useShallow } from "zustand/react/shallow";
import { useModelLoadStore } from "../../model-load.store";
import { ModelLoadingProgressContent } from "./model-loading-progress-content";
import { ModelLoadingProgressErrorAlert } from "./model-loading-progress-error-alert";
import { sortModelFileLoadEntries } from "./model-loading-progress.utils";

interface ModelLoadingProgressProps {
  isLoading: boolean;
}

export const ModelLoadingProgress = ({ isLoading }: ModelLoadingProgressProps) => {
  const { fileLoads, globalStatus, globalErrorMessage } = useModelLoadStore(
    useShallow((s) => ({
      fileLoads: s.fileLoads,
      globalStatus: s.globalStatus,
      globalErrorMessage: s.globalErrorMessage,
    }))
  );
  const isError = globalStatus === "error";
  const fileEntries = sortModelFileLoadEntries(Object.entries(fileLoads));
  const hasFileEntries = fileEntries.length > 0;
  const isBusyLoading = isLoading && !isError;

  if (!isLoading && !isError) {
    return null;
  }

  return (
    <Card styles={{ body: { padding: 24 } }} style={{ width: "100%", marginBottom: 16 }}>
      <Flex vertical gap={16}>
        <Flex align="flex-start" gap={16}>
          <ModelLoadingProgressContent
            isError={isError}
            isBusyLoading={isBusyLoading}
            hasFileEntries={hasFileEntries}
            fileEntries={fileEntries}
          />
        </Flex>

        {isError && <ModelLoadingProgressErrorAlert globalErrorMessage={globalErrorMessage} />}
      </Flex>
    </Card>
  );
};
