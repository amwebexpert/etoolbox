import { isNullish } from "@lichens-innovation/ts-common";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Collapse, Flex, Space } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";
import {
  useCodingStandardsStore,
  useEnabledGuidelineSourceBaseUrl,
  useGetEmbeddingsEngine,
  useIsClearingModelCache,
  useRecomputeAllEmbeddings,
  useRedownloadModel,
} from "../coding-standards.store";
import type { GuidelineNode } from "../coding-standards.types";

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
  const isLoadingModel = useCodingStandardsStore((s) => s.isLoadingModel);
  const isClearingModelCache = useIsClearingModelCache();
  const embeddingsEngine = useGetEmbeddingsEngine();

  const hasGuidelineTree = Boolean(rootNode?.children?.length);
  const isComputingEmbeddings = !isNullish(embeddingsEngine) && embeddingsEngine.isReadyForSemanticSearch !== true;
  const isMaintenanceDisabled = !hasGuidelineTree || isLoadingModel || isClearingModelCache || isComputingEmbeddings;

  const handleRedownloadModel = () => redownloadModel({ rootNode, baseUrl });
  const handleRecomputeAllEmbeddings = () => recomputeAllEmbeddings({ rootNode, baseUrl });

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
