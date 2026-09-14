import { SettingOutlined } from "@ant-design/icons";
import { isNullish } from "@lichens-innovation/ts-common";
import { Button, Collapse, Flex, Space } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";

import {
  useClearModelCache,
  useEnabledGuidelineSourceBaseUrl,
  useGetEmbeddingsEngine,
  useIsClearingModelCache,
  useIsLoadingModel,
  useRecomputeAllEmbeddings,
  useRedownloadModel,
} from "../coding-standards.store";
import type { GuidelineNode } from "../coding-standards.types";
import { hasStoredEmbeddingsData } from "../utils/storage.utils";
interface CodingStandardsAdvancedOptionsProps {
  rootNode: GuidelineNode | null;
}

export const CodingStandardsAdvancedOptions: FunctionComponent<CodingStandardsAdvancedOptionsProps> = ({
  rootNode,
}) => {
  const baseUrl = useEnabledGuidelineSourceBaseUrl();
  const { styles } = useStyles();
  const redownloadModel = useRedownloadModel();
  const recomputeAllEmbeddings = useRecomputeAllEmbeddings();
  const isLoadingModel = useIsLoadingModel();
  const isClearingModelCache = useIsClearingModelCache();
  const clearModelCache = useClearModelCache();
  const embeddingsEngine = useGetEmbeddingsEngine();

  const hasGuidelineTree = Boolean(rootNode?.children?.length);
  const isComputingEmbeddings = !isNullish(embeddingsEngine) && embeddingsEngine.isReadyForSemanticSearch !== true;
  const isMaintenanceDisabled = !hasGuidelineTree || isLoadingModel || isClearingModelCache || isComputingEmbeddings;
  const hasNoCodingStdDataInLocalStorage = !hasStoredEmbeddingsData();

  const handleRedownloadModel = () => {
    void redownloadModel({ rootNode, baseUrl });
  };
  const handleRecomputeAllEmbeddings = () => {
    void recomputeAllEmbeddings({ rootNode, baseUrl });
  };
  const handleClearModelCache = () => {
    clearModelCache();
  };

  const items = [
    {
      key: "maintenance",
      label: (
        <Space>
          <SettingOutlined />
          <span>Advanced options</span>
        </Space>
      ),
      children: (
        <Flex vertical style={{ maxHeight: 500, overflowY: "auto", paddingRight: 8 }}>
          <Space size="middle" style={{ width: "100%" }}>
            <Button type="default" disabled={isMaintenanceDisabled} onClick={handleRedownloadModel}>
              Re-download model
            </Button>
            <Button type="default" disabled={isMaintenanceDisabled} onClick={handleRecomputeAllEmbeddings}>
              Recompute all embeddings
            </Button>
            <Button
              type="default"
              disabled={isMaintenanceDisabled || hasNoCodingStdDataInLocalStorage}
              onClick={handleClearModelCache}
            >
              Clear embedding cache
            </Button>
          </Space>
        </Flex>
      ),
    },
  ];

  return <Collapse bordered={false} className={styles.collapse} items={items} />;
};

const useStyles = createStyles(({ token }) => ({
  collapse: {
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
