import { FileSearchOutlined } from "@ant-design/icons";
import { isNullish } from "@lichens-innovation/ts-common";
import { Flex } from "antd";
import { createStyles } from "antd-style";
import { useEffect } from "react";
import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { SearchInput } from "~/components/ui/search-input";
import { useCodingStandardsStore, useDisposeEmbeddings } from "./coding-standards.store";
import { EmbeddingsProgress } from "./components/embeddings-progress";
import { ModelLoadingProgress } from "./components/model-loading-progress";
import { ResultsList } from "./components/results-list";
import { useMarkdownLoader } from "./hooks/use-markdown-loader";
import { useSemanticSearch } from "./hooks/use-semantic-search";

export const CodingStandards = () => {
  const { styles } = useStyles();
  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    searchResults,
    guidelineSources,
    embeddingsProgress,
    isLoadingModel,
    modelLoadProgress,
  } = useCodingStandardsStore();

  const disposeEmbeddings = useDisposeEmbeddings();
  const { rootNode, isLoadingGuidelines, guidelinesError } = useMarkdownLoader(guidelineSources);
  const baseUrl = guidelineSources.find((s) => s.enabled)?.url ?? "";
  const { search, isReadyForSemanticSearch } = useSemanticSearch({ rootNode, baseUrl });

  useEffect(() => {
    return disposeEmbeddings; // Dispose embeddings engine when leaving the screen to free memory
  }, [disposeEmbeddings]);

  useEffect(() => {
    search(searchQuery);
  }, [searchQuery, rootNode, search]);

  const shouldShowEmbeddingsProgress = !isReadyForSemanticSearch && !isLoadingModel;

  if (guidelinesError) {
    return (
      <ScreenContainer>
        <ScreenHeader
          icon={<FileSearchOutlined />}
          title="Coding Standards Finder"
          description="Semantic search for React and TypeScript coding standards"
        />
        <div className={styles.error}>Error loading guidelines: {guidelinesError.message}</div>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<FileSearchOutlined />}
          title="Coding Standards Finder"
          description="Semantic search for React and TypeScript coding standards and best practices"
        />

        {isLoadingGuidelines && <div className={styles.loading}>Loading guidelines from sources...</div>}

        {!isLoadingGuidelines && !isNullish(rootNode) && (
          <>
            <ModelLoadingProgress isLoading={isLoadingModel} progress={modelLoadProgress} />

            <SearchInput
              value={searchQuery}
              loading={isSearching || isLoadingModel}
              onChange={setSearchQuery}
              onSearch={() => search(searchQuery)}
              placeholder="Chercher une règle de coding standards..."
            />

            {shouldShowEmbeddingsProgress && <EmbeddingsProgress progress={embeddingsProgress} />}

            <ResultsList results={searchResults} isLoading={isSearching} />
          </>
        )}
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  loading: {
    padding: 24,
    textAlign: "center",
  },
  error: {
    padding: 24,
    textAlign: "center",
    color: "#ff4d4f",
  },
}));
